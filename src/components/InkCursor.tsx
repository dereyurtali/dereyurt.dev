'use client';

import { useEffect, useRef } from 'react';

/**
 * Wet ink, dragged by the cursor.
 *
 * A real fluid solver (Stam's stable fluids: advect → curl → vorticity →
 * divergence → Jacobi pressure → subtract gradient), running on the GPU in
 * WebGL2. The pointer injects velocity and dye; the dye then behaves like ink
 * dropped on a wet sheet, which is the one thing this page already is.
 *
 * It is composited with mix-blend-multiply, so the ink darkens the paper instead
 * of glowing on top of it — no external library, nothing loaded from a CDN (the
 * CSP forbids it), and nothing at all on touch devices, which have no cursor to
 * follow and no GPU budget to waste.
 */

type Palette = 'ink' | 'colour';

const SIM = 128; // velocity grid
const DYE = 384; // colour grid
const PRESSURE_ITERATIONS = 14;

// These go straight into `result / (1 + dissipation * dt)`, so they are decay
// RATES, not survival factors: 3.2 soaks a stroke into the paper in about a
// second, which is what keeps the page readable — the ink only ever exists as a
// trail near the cursor, never as a cloud sitting on top of the text.
const VELOCITY_DISSIPATION = 0.5;
const DYE_DISSIPATION = 3.2;

const CURL_STRENGTH = 22;
const SPLAT_RADIUS = 0.00085;
const SPLAT_FORCE = 4600;
const DENSITY_GAIN = 0.45; // how dark the wettest ink is allowed to get

// Ink, and the one loud colour the rest of the site is allowed. Weighted so most
// strokes are ink and the signal only turns up now and then.
const INK_COLOURS: [number, number, number][] = [
  [0.08, 0.09, 0.1], // ink
  [0.08, 0.09, 0.1],
  [0.08, 0.09, 0.1],
  [0.79, 0.24, 0.04], // signal
  [0.11, 0.42, 0.26], // green, rarely
];

const BASE_VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const COPY_FRAG = `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
uniform sampler2D uTexture;
out vec4 fragColor;
void main () { fragColor = texture(uTexture, vUv); }`;

const CLEAR_FRAG = `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
out vec4 fragColor;
void main () { fragColor = value * texture(uTexture, vUv); }`;

// The dye carries pigment (rgb) and how much of it there is (a), so the display
// pass can recover the ink's own colour instead of guessing it from brightness.
const SPLAT_FRAG = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
out vec4 fragColor;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  float s = exp(-dot(p, p) / radius);
  vec4 base = texture(uTarget, vUv);
  fragColor = vec4(base.rgb + s * color, base.a + s);
}`;

const ADVECTION_FRAG = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
out vec4 fragColor;
void main () {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  vec4 result = texture(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  fragColor = result / decay;
}`;

const DIVERGENCE_FRAG = `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const CURL_FRAG = `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`;

const VORTICITY_FRAG = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
out vec4 fragColor;
void main () {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const PRESSURE_FRAG = `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
out vec4 fragColor;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`;

const GRADIENT_FRAG = `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

// Paper seen THROUGH ink: the pigment colour is a transmittance, so the canvas
// outputs white where there is no ink (multiply by white changes nothing) and the
// ink's own colour where there is. Treating the pigment as light instead — the
// obvious way — turns black ink into a pale blue haze and orange into cyan.
const DISPLAY_FRAG = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
uniform sampler2D uTexture;
uniform float gain;
out vec4 fragColor;
void main () {
  vec4 c = texture(uTexture, vUv);
  float d = clamp(c.a * gain, 0.0, 1.0);
  vec3 pigment = c.a > 0.001 ? clamp(c.rgb / c.a, 0.0, 1.0) : vec3(1.0);
  fragColor = vec4(mix(vec3(1.0), pigment, d), 1.0);
}`;

type FBO = { texture: WebGLTexture; fbo: WebGLFramebuffer; width: number; height: number; texelX: number; texelY: number; attach: (id: number) => number };
type DoubleFBO = { read: FBO; write: FBO; swap: () => void; texelX: number; texelY: number };

export default function InkCursor({ palette = 'ink' }: { palette?: Palette }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // No cursor to follow, or the visitor asked for stillness: do nothing at all.
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ?fluid=colour / ?fluid=ink — so the two palettes can be compared on the real
    // page instead of in a screenshot.
    const override = new URLSearchParams(window.location.search).get('fluid');
    const mode: Palette = override === 'colour' || override === 'ink' ? override : palette;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;
    if (!gl.getExtension('EXT_color_buffer_float')) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vert = compile(gl.VERTEX_SHADER, BASE_VERT);
    if (!vert) return;

    const program = (fragSource: string) => {
      const frag = compile(gl.FRAGMENT_SHADER, fragSource);
      if (!frag) return null;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vert);
      gl.attachShader(prog, frag);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        return null;
      }
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(prog, i)!.name;
        uniforms[name] = gl.getUniformLocation(prog, name)!;
      }
      return { prog, uniforms };
    };

    const copyProg = program(COPY_FRAG)!;
    const clearProg = program(CLEAR_FRAG)!;
    const splatProg = program(SPLAT_FRAG)!;
    const advectionProg = program(ADVECTION_FRAG)!;
    const divergenceProg = program(DIVERGENCE_FRAG)!;
    const curlProg = program(CURL_FRAG)!;
    const vorticityProg = program(VORTICITY_FRAG)!;
    const pressureProg = program(PRESSURE_FRAG)!;
    const gradientProg = program(GRADIENT_FRAG)!;
    const displayProg = program(DISPLAY_FRAG)!;
    if (!copyProg || !displayProg) return;

    // fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const elements = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elements);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (target: FBO | null) => {
      if (target === null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    const createFBO = (w: number, h: number, internal: number, format: number, type: number): FBO => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelX: 1 / w,
        texelY: 1 / h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    };

    const createDouble = (w: number, h: number, internal: number, format: number, type: number): DoubleFBO => {
      let fbo1 = createFBO(w, h, internal, format, type);
      let fbo2 = createFBO(w, h, internal, format, type);
      return {
        texelX: fbo1.texelX,
        texelY: fbo1.texelY,
        get read() {
          return fbo1;
        },
        get write() {
          return fbo2;
        },
        swap() {
          const t = fbo1;
          fbo1 = fbo2;
          fbo2 = t;
        },
      };
    };

    const rgba = { internal: gl.RGBA16F, format: gl.RGBA };
    const rg = { internal: gl.RG16F, format: gl.RG };
    const r = { internal: gl.R16F, format: gl.RED };
    const HALF = gl.HALF_FLOAT;

    let dye = createDouble(DYE, DYE, rgba.internal, rgba.format, HALF);
    const velocity = createDouble(SIM, SIM, rg.internal, rg.format, HALF);
    const divergence = createFBO(SIM, SIM, r.internal, r.format, HALF);
    const curl = createFBO(SIM, SIM, r.internal, r.format, HALF);
    const pressure = createDouble(SIM, SIM, r.internal, r.format, HALF);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, down: false };

    const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
      gl.useProgram(splatProg!.prog);
      gl.uniform1i(splatProg!.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProg!.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProg!.uniforms.point, x, y);
      gl.uniform3f(splatProg!.uniforms.color, dx, dy, 0);
      gl.uniform1f(splatProg!.uniforms.radius, SPLAT_RADIUS);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProg!.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProg!.uniforms.color, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    };

    const pickColour = (): [number, number, number] => {
      if (mode === 'colour') {
        // the reference's rainbow: a random hue, kept light so it tints rather than stains
        const h = Math.random();
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const q = 1 - f;
        const table: [number, number, number][] = [
          [1, f, 0],
          [q, 1, 0],
          [0, 1, f],
          [0, q, 1],
          [f, 0, 1],
          [1, 0, q],
        ];
        return table[i % 6];
      }
      return INK_COLOURS[Math.floor(Math.random() * INK_COLOURS.length)];
    };

    let colour = pickColour();
    let strokeAge = 0;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.dx = dx * SPLAT_FORCE;
      pointer.dy = dy * SPLAT_FORCE;
      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) pointer.moved = true;
      lastMove = performance.now();
      if (idle) {
        idle = false;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }

      // a stroke keeps one colour for a while, then the pen is dipped again
      if (++strokeAge > 60) {
        strokeAge = 0;
        colour = pickColour();
      }
    };

    const onDown = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = 1 - e.clientY / window.innerHeight;
      colour = pickColour();
      splat(pointer.x, pointer.y, 0, 0, colour);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);

    let last = performance.now();
    let lastMove = performance.now();
    let raf = 0;
    let running = true;
    let idle = false;

    const IDLE_AFTER = 2500; // the dye is long gone by then; keep the GPU quiet


    const step = (dt: number) => {
      gl.disable(gl.BLEND);

      gl.useProgram(curlProg!.prog);
      gl.uniform2f(curlProg!.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(curlProg!.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      gl.useProgram(vorticityProg!.prog);
      gl.uniform2f(vorticityProg!.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(vorticityProg!.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProg!.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProg!.uniforms.curl, CURL_STRENGTH);
      gl.uniform1f(vorticityProg!.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(divergenceProg!.prog);
      gl.uniform2f(divergenceProg!.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(divergenceProg!.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      gl.useProgram(clearProg!.prog);
      gl.uniform1i(clearProg!.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProg!.uniforms.value, 0.8);
      blit(pressure.write);
      pressure.swap();

      gl.useProgram(pressureProg!.prog);
      gl.uniform2f(pressureProg!.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(pressureProg!.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProg!.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gl.useProgram(gradientProg!.prog);
      gl.uniform2f(gradientProg!.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(gradientProg!.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientProg!.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(advectionProg!.prog);
      gl.uniform2f(advectionProg!.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(advectionProg!.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg!.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionProg!.uniforms.dt, dt);
      gl.uniform1f(advectionProg!.uniforms.dissipation, VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(advectionProg!.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg!.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProg!.uniforms.dissipation, DYE_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    const render = () => {
      gl.disable(gl.BLEND);
      gl.useProgram(displayProg!.prog);
      gl.uniform1i(displayProg!.uniforms.uTexture, dye.read.attach(0));
      gl.uniform1f(displayProg!.uniforms.gain, DENSITY_GAIN);
      blit(null);
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.016);
      last = now;

      if (pointer.moved) {
        pointer.moved = false;
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, colour);
      }

      step(dt);
      render();

      // Nothing is moving and the paper has drunk the ink: stop until the cursor
      // comes back, rather than solving Navier-Stokes at 60 Hz behind a reader.
      if (now - lastMove > IDLE_AFTER) {
        idle = true;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    // a tab in the background must not keep a fluid solver on the GPU
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [palette]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full mix-blend-multiply print:hidden"
    />
  );
}
