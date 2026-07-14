'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero background: a loose colony of theme-coloured circles floating in a
 * shallow 3D space over the paper. The camera focuses on a mid plane: circles
 * near it are small-ish and crisp, the far ones shrink and soften, and the
 * ones drifting right up to the lens grow into big, dim, out-of-focus discs —
 * the same depth cues a photograph gives. Each circle also drifts slowly in
 * depth, so it swells and sharpens as it crosses the focal plane. Every one
 * wanders on its own pair of sine waves, so the group reads as one slow
 * organism instead of a particle spray.
 *
 * The cursor is a point of interest, not a magnet. Circles ease toward it and
 * settle into a loose ring around it, and the pull is gated by cursor speed:
 * a hand moving slowly gathers them, a fast sweep barely registers. On touch
 * screens (and with reduced motion) there is no cursor to court, so they just
 * drift (or hold still).
 */

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // depth 0..1 — 0 deep in the scene, 1 against the lens
  zBase: number; // home depth; z breathes around it
  r: number; // radius at the focal plane
  p1: number; // wander phases…
  p2: number;
  p3: number; // …p3/f3 drive the depth drift…
  f1: number; // …and frequencies, unique per circle so no two move alike
  f2: number;
  f3: number;
  ch: string; // colour channels, "r, g, b"
  a: number; // pigment when perfectly in focus
};

// globals.css @theme values restated as channels: the canvas repaints these
// every frame, and they only ever change together with the palette anyway.
const INK = '21, 23, 26';
const SIGNAL = '201, 60, 11';
const GREEN = '28, 107, 66';

const TAU = Math.PI * 2;

// where the camera focuses in the 0..1 depth range
const FOCUS = 0.6;

function makeOrb(w: number, h: number): Orb {
  const zBase = 0.05 + Math.random() * 0.95;
  // Mostly ink; the signal orange and green stay rare enough to read as
  // accents, not confetti.
  const roll = Math.random();
  const ch = roll < 0.78 ? INK : roll < 0.93 ? SIGNAL : GREEN;
  const a = (roll < 0.78 ? 0.15 : 0.17) + Math.random() * 0.05;

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
    z: zBase,
    zBase,
    // squared bias: many small dots, the occasional big soft disc
    r: 6 + 42 * Math.pow(Math.random(), 2.1),
    p1: Math.random() * TAU,
    p2: Math.random() * TAU,
    p3: Math.random() * TAU,
    f1: 0.15 + Math.random() * 0.35,
    f2: 0.15 + Math.random() * 0.35,
    f3: 0.05 + Math.random() * 0.1,
    ch,
    a,
  };
}

export default function OrbField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let orbs: Orb[] = [];
    let rect = canvas.getBoundingClientRect();

    const targetCount = () => Math.round(Math.min(34, Math.max(14, (w * h) / 38000)));

    const size = () => {
      const prevW = w;
      const prevH = h;
      rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      // phones pay for every blended pixel twice over — 1.5x is visually
      // identical for soft discs and markedly cheaper than 2-3x
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!orbs.length) {
        orbs = Array.from({ length: targetCount() }, () => makeOrb(w, h));
      } else {
        // keep the colony through resizes: stretch positions with the box
        if (prevW && prevH) {
          for (const o of orbs) {
            o.x *= w / prevW;
            o.y *= h / prevH;
          }
        }
        while (orbs.length < targetCount()) orbs.push(makeOrb(w, h));
        orbs.length = Math.min(orbs.length, targetCount());
      }
    };

    const draw = (t: number, parX: number, parY: number) => {
      ctx.clearRect(0, 0, w, h);
      // painter's order: deep circles first, so a near bokeh disc drifting
      // over a far dot occludes it the way a real foreground would
      orbs.sort((a, b) => a.z - b.z);
      for (const o of orbs) {
        // near circles shift more with the cursor — quadratic in depth, so
        // the foreground visibly slides over the background
        const px = parX * (0.012 + 0.075 * o.z * o.z);
        const py = parY * (0.012 + 0.075 * o.z * o.z);
        const x = o.x + px;
        const y = o.y + py;
        // perspective: a circle swells as it drifts toward the lens, plus a
        // slow breath that keeps even a resting colony alive
        const persp = 0.3 + 1.6 * o.z * o.z;
        const rr = Math.max(o.r * persp * (1 + 0.04 * Math.sin(t * 0.6 + o.p1)), 0.6);
        // depth of field: pigment concentrates at the focal plane; off it,
        // the same pigment spreads into a dimmer disc with a melted edge
        const defocus = Math.min(1, Math.abs(o.z - FOCUS) / 0.5);
        const alpha = o.a * (1 - 0.6 * defocus);
        const edge = Math.max(0, 1 - (0.1 + 0.8 * defocus));
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr);
        g.addColorStop(0, `rgba(${o.ch}, ${alpha.toFixed(3)})`);
        g.addColorStop(edge, `rgba(${o.ch}, ${alpha.toFixed(3)})`);
        g.addColorStop(1, `rgba(${o.ch}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, TAU);
        ctx.fillStyle = g;
        ctx.fill();
      }
    };

    size();

    if (reduced) {
      // a still scatter — the composition without the organism
      draw(0, 0, 0);
      const ro = new ResizeObserver(() => {
        size();
        draw(0, 0, 0);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    const mouse = { x: 0, y: 0, px: 0, py: 0, active: false };
    // smoothed cursor, used for parallax so the depth shift never jitters
    let smX = w / 2;
    let smY = h / 2;
    let influence = 0; // 0..1 — how much the colony currently cares about the cursor
    let t = 0;
    let last = performance.now();
    let raf = 0;
    let running = false;
    let inView = true;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (dt <= 0) return;
      t += dt;

      // Cursor speed decides how approachable the cursor is: a slow hand
      // reads as calm (influence → 1), a sweep reads as a threat (→ 0).
      const speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py) / dt;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      const want = mouse.active ? Math.max(0, 1 - speed / 1100) : 0;
      // trust builds slowly, evaporates a little faster
      influence += (want - influence) * Math.min(1, dt * (want > influence ? 1.6 : 3));

      const parTX = mouse.active ? mouse.x - w / 2 : 0;
      const parTY = mouse.active ? mouse.y - h / 2 : 0;
      smX += (parTX - smX) * Math.min(1, dt * 2.5);
      smY += (parTY - smY) * Math.min(1, dt * 2.5);

      const reach = Math.min(w, h) * 0.65;
      const damp = Math.exp(-dt * 1.5);

      for (const o of orbs) {
        // depth drift: each circle slowly floats toward and away from the
        // lens, swelling and sharpening as it crosses the focal plane
        o.z = Math.min(1, Math.max(0.05, o.zBase + 0.16 * Math.sin(t * o.f3 + o.p3)));

        const near = 0.35 + 0.65 * o.z;

        // idle wander: two incommensurate sines per axis, per circle
        let ax = Math.cos(t * o.f1 + o.p1) * 22 * near;
        let ay = Math.sin(t * o.f2 + o.p2) * 22 * near;

        if (influence > 0.01) {
          const dx = mouse.x - o.x;
          const dy = mouse.y - o.y;
          const dist = Math.hypot(dx, dy) || 1;
          const dirx = dx / dist;
          const diry = dy / dist;
          // each circle keeps personal space, so they ring the cursor
          // instead of piling onto it
          const ring = 60 + o.r * 0.5 + 40 * o.z;
          const pull = 240 * influence * near;
          const g =
            dist > ring
              ? pull * Math.max(0, 1 - dist / reach)
              : -pull * 1.4 * (1 - dist / ring);
          // a touch of sideways drift makes the gathering orbital, not ballistic
          const swirl = pull * 0.2 * Math.max(0, 1 - dist / reach);
          ax += dirx * g - diry * swirl;
          ay += diry * g + dirx * swirl;
        }

        // soft walls: steer back rather than bounce
        const m = 30;
        if (o.x < m) ax += (m - o.x) * 1.5;
        if (o.x > w - m) ax -= (o.x - (w - m)) * 1.5;
        if (o.y < m) ay += (m - o.y) * 1.5;
        if (o.y > h - m) ay -= (o.y - (h - m)) * 1.5;

        o.vx = (o.vx + ax * dt) * damp;
        o.vy = (o.vy + ay * dt) * damp;
        // drift is slow; gathering may hurry a little, never dart
        const vmax = (26 + 80 * o.z) * (0.55 + 0.75 * influence);
        const v = Math.hypot(o.vx, o.vy);
        if (v > vmax) {
          o.vx = (o.vx / v) * vmax;
          o.vy = (o.vy / v) * vmax;
        }
        o.x += o.vx * dt;
        o.y += o.vy * dt;
      }

      draw(t, smX, smY);
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x > -40 && x < w + 40 && y > -40 && y < h + 40;
      if (inside) {
        if (!mouse.active) {
          // fresh entry: no phantom velocity from wherever the cursor last was
          mouse.px = x;
          mouse.py = y;
        }
        mouse.x = x;
        mouse.y = y;
      }
      mouse.active = inside;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onScroll = () => {
      rect = canvas.getBoundingClientRect();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    // no mouse, no courtship — touch devices skip the pointer wiring entirely
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
    }
    window.addEventListener('blur', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
