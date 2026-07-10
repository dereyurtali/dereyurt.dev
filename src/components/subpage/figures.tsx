'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

const C = {
  ink: 'var(--color-ink)',
  dim: 'var(--color-ink-dim)',
  faint: 'var(--color-ink-faint)',
  line: 'var(--color-line-2)',
  signal: 'var(--color-signal)',
  card: 'var(--color-card)',
  green: 'var(--color-green)',
  red: 'var(--color-red)',
};

const T = (props: React.SVGProps<SVGTextElement>) => (
  <text fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.2" fill={C.faint} {...props} />
);

/** Figure frame: bordered plate with a mono caption strip, like a drawing sheet */
export function Plate({
  caption,
  children,
  tall,
}: {
  caption: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <figure className="card min-w-0" data-reveal>
      {/* The drawings do not survive being squeezed into 350px, so on narrow
          screens they keep their size and the frame scrolls sideways instead. */}
      <div className="overflow-x-auto p-4">
        <div className={`min-w-[620px] lg:min-w-0 ${tall ? 'h-[440px] lg:h-[520px]' : 'h-[320px] lg:h-[400px]'}`}>
          {children}
        </div>
      </div>
      <figcaption className="label flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
        <span>{caption}</span>
        <span className="shrink-0 text-signal lg:hidden">SWIPE →</span>
      </figcaption>
    </figure>
  );
}

/* ══════════ MISSION PROFILE — descent trajectory drawn by scroll ══════════ */
export type Phase = { x: number; y: number; n: string; label: string; sub: string };

export function MissionProfile({
  path,
  phases,
  altitudes,
  notes,
  carrier,
}: {
  path: string;
  phases: Phase[];
  altitudes: { y: number; label: string }[];
  notes?: { x: number; y: number; text: string; signal?: boolean; anchor?: 'start' | 'middle' | 'end' }[];
  carrier?: string;
}) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 82%', end: 'bottom 40%', scrub: 0.7 },
      });

      tl.from('.mp-axis', { strokeDashoffset: 1, duration: 0.6, ease: 'none' })
        .from('.mp-alt', { autoAlpha: 0, x: -6, stagger: 0.12, duration: 0.4 }, '-=0.3')
        .from('.mp-track', { strokeDashoffset: 1, duration: 3.2, ease: 'none' }, 0.4)
        .from('.mp-phase', { autoAlpha: 0, scale: 0.6, transformOrigin: 'center', stagger: 0.42, duration: 0.4 }, 0.8)
        .from('.mp-note', { autoAlpha: 0, stagger: 0.5, duration: 0.35 }, 1.2);

      if (svg.querySelector('.mp-carrier')) {
        tl.from('.mp-carrier', { strokeDashoffset: 1, duration: 1.4, ease: 'none' }, 1.6);
      }

      // capsule rides the trajectory as it is drawn
      gsap.to('.mp-ping', { opacity: 0.2, duration: 0.9, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    },
    { scope: root }
  );

  return (
    <svg ref={root} viewBox="0 0 900 450" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* altitude ladder */}
      <path className="mp-axis" d="M60 30 V400" pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} strokeWidth="1" />
      {altitudes.map((a) => (
        <g className="mp-alt" key={a.label}>
          <line x1={54} y1={a.y} x2={66} y2={a.y} stroke={C.line} />
          <line x1={66} y1={a.y} x2={752} y2={a.y} stroke={C.line} strokeDasharray="2 8" opacity={0.5} />
          <T x={48} y={a.y + 3} textAnchor="end">{a.label}</T>
        </g>
      ))}
      <line x1={60} y1={400} x2={870} y2={400} stroke={C.line} />
      <T x={70} y={416}>GROUND</T>

      {/* carrier path */}
      {carrier && (
        <>
          <path className="mp-carrier" d={carrier} pathLength={1} strokeDasharray="1" fill="none" stroke={C.faint} strokeWidth="1" opacity={0.55} />
        </>
      )}

      {/* main trajectory */}
      <path className="mp-track" d={path} pathLength={1} strokeDasharray="1" fill="none" stroke={C.signal} strokeWidth="1.8" />

      {/* phase nodes */}
      {phases.map((p) => (
        <g className="mp-phase" key={p.n}>
          <rect x={p.x - 9} y={p.y - 9} width={18} height={18} fill={C.card} stroke={C.signal} strokeWidth={1.4} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={C.signal}>
            {p.n}
          </text>
          <T x={p.x} y={p.y + 28} textAnchor="middle" fill={C.dim} fontSize="9">{p.label}</T>
          <T x={p.x} y={p.y + 42} textAnchor="middle" fontSize="7.5">{p.sub}</T>
        </g>
      ))}

      {/* annotations */}
      {notes?.map((n) => (
        <T className="mp-note" key={n.text} x={n.x} y={n.y} textAnchor={n.anchor ?? 'start'} fill={n.signal ? C.signal : C.faint} fontSize="7.5">
          {n.text}
        </T>
      ))}

      {/* telemetry ping */}
      <g className="mp-ping" transform="translate(806,60)">
        <circle cx={0} cy={0} r={4} fill={C.signal} />
        <circle cx={0} cy={0} r={11} fill="none" stroke={C.signal} opacity={0.5} />
        <circle cx={0} cy={0} r={18} fill="none" stroke={C.signal} opacity={0.25} />
      </g>
    </svg>
  );
}

/* ══════════ LAYER STACK — exploded payload assembles as you scroll ══════════ */
export function LayerStack({
  layers,
  carrier,
}: {
  layers: { label: string; sub: string; h: number }[];
  carrier?: { label: string; sub: string };
}) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 45%', scrub: 0.8 },
      });
      // katmanlar patlamış halden birleşik yığına iner
      tl.from('.ls-layer', { y: (i: number) => -70 + i * 34, autoAlpha: 0, stagger: 0.22, duration: 1, ease: 'power2.out' })
        .from('.ls-dim', { strokeDashoffset: 1, duration: 0.8, ease: 'none' }, '-=0.5')
        .from('.ls-carrier', { autoAlpha: 0, y: 24, duration: 0.6 }, '-=0.4')
        .from('.ls-sep', { strokeDashoffset: 1, duration: 0.5 }, '-=0.3');
    },
    { scope: root }
  );

  let y = 40;
  const rows = layers.map((l, i) => {
    const row = { ...l, y, i };
    y += l.h + 8;
    return row;
  });
  const stackBottom = y - 8;

  return (
    <svg ref={root} viewBox="0 0 620 480" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {rows.map((r) => (
        <g className="ls-layer" key={r.label}>
          <rect x={140} y={r.y} width={310} height={r.h} fill={C.card} stroke={r.i === 0 ? C.signal : C.line} strokeWidth={r.i === 0 ? 1.5 : 1} />
          <text x={158} y={r.y + 20} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.3" fill={r.i === 0 ? C.signal : C.dim}>
            {r.label}
          </text>
          <T x={158} y={r.y + 36} fontSize="8">{r.sub}</T>
          <T x={128} y={r.y + 14} textAnchor="end">L{r.i + 1}</T>
        </g>
      ))}

      {/* dimension line down the stack */}
      <g>
        <path className="ls-dim" d={`M480 40 V${stackBottom}`} pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} />
        <line x1={475} y1={40} x2={485} y2={40} stroke={C.line} />
        <line x1={475} y1={stackBottom} x2={485} y2={stackBottom} stroke={C.line} />
        <T x={496} y={(40 + stackBottom) / 2}>PAYLOAD</T>
      </g>

      {carrier && (
        <>
          <path className="ls-sep" d={`M295 ${stackBottom} V${stackBottom + 34}`} pathLength={1} strokeDasharray="1" fill="none" stroke={C.signal} />
          <T className="ls-sep" x={307} y={stackBottom + 22} fill={C.signal} fontSize="7.5">SEPARATION</T>
          <g className="ls-carrier">
            <rect x={140} y={stackBottom + 34} width={310} height={48} fill={C.card} stroke={C.line} strokeDasharray="4 3" />
            <text x={158} y={stackBottom + 56} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.3" fill={C.dim}>
              {carrier.label}
            </text>
            <T x={158} y={stackBottom + 71} fontSize="8">{carrier.sub}</T>
          </g>
        </>
      )}
    </svg>
  );
}

/* ══════════ STATE MACHINE — a pulse walks the flight states ══════════ */
export function StateMachine({ states }: { states: string[] }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 88%', end: 'bottom 55%', scrub: 0.7 },
      });
      tl.from('.sm-node', { autoAlpha: 0, y: 10, stagger: 0.3, duration: 0.5 }).from(
        '.sm-wire',
        { strokeDashoffset: 1, stagger: 0.3, duration: 0.4 },
        0.25
      );

      // sürekli dolaşan durum pulsu
      const n = states.length;
      const dot = svg.querySelector('.sm-dot');
      const loop = gsap.timeline({ repeat: -1 });
      states.forEach((_, i) => {
        loop.to(dot, { x: i * 118, duration: 0.5, ease: 'power2.inOut' }).to({}, { duration: 0.35 });
      });
      loop.to(dot, { opacity: 0, duration: 0.2 }).set(dot, { x: 0 }).to(dot, { opacity: 1, duration: 0.2 });
      void n;
    },
    { scope: root }
  );

  return (
    <svg ref={root} viewBox="0 0 860 120" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect className="sm-dot" x={26} y={30} width={92} height={40} fill={C.signal} opacity={0.12} />
      {states.map((s, i) => {
        const x = 26 + i * 118;
        return (
          <g key={s}>
            <g className="sm-node">
              <rect x={x} y={30} width={92} height={40} fill="none" stroke={i === states.length - 1 ? C.green : C.line} />
              <text x={x + 46} y={55} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.2" fill={C.dim}>
                {s}
              </text>
            </g>
            {i < states.length - 1 && (
              <path className="sm-wire" d={`M${x + 92} 50 H${x + 118}`} pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} />
            )}
          </g>
        );
      })}
      <T x={26} y={92}>EEPROM-PERSISTED · SURVIVES POWER LOSS · MANUAL OVERRIDE (KOMUT)</T>
    </svg>
  );
}

/* ══════════ SPIN STABILIZATION — body spins, camera counter-rotates ══════════ */
export function SpinRig() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // Dönüş eksenleri mutlak SVG koordinatında — iç içe transform yok,
      // aksi halde GSAP bbox merkezini alıp figürü savuruyor.
      gsap.to('.sr-body', { rotate: 360, svgOrigin: '160 180', duration: 7, repeat: -1, ease: 'none' });
      gsap.to('.sr-cam', { rotate: -360, svgOrigin: '160 180', duration: 7, repeat: -1, ease: 'none' });
      gsap.to('.sr-horizon-raw', { rotate: 360, svgOrigin: '437 147', duration: 7, repeat: -1, ease: 'none' });

      const svg = root.current!;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 50%', scrub: 0.8 },
      });
      tl.from('.sr-frame', { autoAlpha: 0, stagger: 0.4, duration: 0.6 }).from('.sr-wire', {
        strokeDashoffset: 1,
        duration: 0.8,
      });
    },
    { scope: root }
  );

  return (
    <svg ref={root} viewBox="0 0 760 340" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* rig */}
      <g className="sr-frame">
        <T x={40} y={40}>COUNTER-ROTATING CAMERA RIG</T>

        {/* spinning body */}
        <g className="sr-body">
          <rect x={102} y={102} width={116} height={156} fill={C.card} stroke={C.line} />
          <line x1={102} y1={140} x2={218} y2={140} stroke={C.line} />
          <line x1={102} y1={220} x2={218} y2={220} stroke={C.line} />
          <circle cx={160} cy={88} r={5} fill={C.line} />
        </g>

        {/* camera platform, counter-rotating */}
        <g className="sr-cam">
          <circle cx={160} cy={180} r={34} fill={C.card} stroke={C.signal} strokeWidth={1.5} />
          <rect x={152} y={140} width={16} height={12} fill={C.signal} />
          <circle cx={160} cy={180} r={12} fill="none" stroke={C.signal} />
        </g>

        <T x={160} y={296} textAnchor="middle" fill={C.signal} fontSize="7.5">GYRO → MOTOR → ENCODER</T>
      </g>

      <path className="sr-wire" d="M262 180 H352" pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} />

      {/* raw viewport — the horizon tumbles */}
      <g className="sr-frame">
        <T x={352} y={70}>RAW SENSOR VIEW</T>
        <rect x={352} y={84} width={170} height={126} fill={C.card} stroke={C.line} />
        <g clipPath="url(#clipRaw)">
          <g className="sr-horizon-raw">
            <rect x={317} y={147} width={240} height={120} fill={C.line} opacity={0.35} />
            <line x1={317} y1={147} x2={557} y2={147} stroke={C.dim} />
          </g>
        </g>
        <T x={352} y={228} fill={C.red} fontSize="7.5">HORIZON SPINS WITH THE BODY</T>
      </g>

      {/* stabilized viewport — the horizon holds */}
      <g className="sr-frame">
        <T x={556} y={70}>STABILIZED VIEW</T>
        <rect x={556} y={84} width={170} height={126} fill={C.card} stroke={C.signal} strokeWidth={1.5} />
        <g clipPath="url(#clipStab)">
          <rect x={521} y={147} width={240} height={120} fill={C.signal} opacity={0.12} />
          <line x1={521} y1={147} x2={761} y2={147} stroke={C.signal} />
        </g>
        <T x={556} y={228} fill={C.green} fontSize="7.5">HORIZON HELD — NO CPU COST</T>
      </g>

      <defs>
        <clipPath id="clipRaw">
          <rect x={352} y={84} width={170} height={126} />
        </clipPath>
        <clipPath id="clipStab">
          <rect x={556} y={84} width={170} height={126} />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ══════════ PRINTIMIZE PIPELINE — STL → vision → ML → optimizer → G-code ══════════ */
export function PrintPipeline() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 45%', scrub: 0.8 },
      });
      tl.from('.pp-node', { autoAlpha: 0, y: 14, stagger: 0.3, duration: 0.5 })
        .from('.pp-wire', { strokeDashoffset: 1, stagger: 0.3, duration: 0.45 }, 0.2)
        .from('.pp-schema', { autoAlpha: 0, x: -10, duration: 0.5 }, '-=0.6')
        .from('.pp-loop', { strokeDashoffset: 1, duration: 1, ease: 'power2.inOut' });

      gsap.set('.pp-flow', { opacity: 0 });
      tl.to('.pp-flow', { opacity: 1, duration: 0.01 }, '>-0.3');
      gsap.fromTo('.pp-flow', { strokeDashoffset: 0 }, { strokeDashoffset: -48, duration: 1.8, repeat: -1, ease: 'none' });
      gsap.to('.pp-scan', { y: 44, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    },
    { scope: root }
  );

  const nodes = [
    { x: 20, label: 'STL', sub: 'GEOMETRY' },
    { x: 158, label: 'MULTI-ANGLE', sub: 'RENDERS' },
    { x: 296, label: 'CLAUDE VISION', sub: 'FORCED TOOL-USE', accent: true },
    { x: 434, label: 'ML MODEL', sub: 'R² = 0.99' },
    { x: 572, label: 'BAYESIAN OPT', sub: 'gp_minimize · qNEHVI', accent: true },
  ];

  return (
    <svg ref={root} viewBox="0 0 760 340" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {nodes.map((n, i) => (
        <g key={n.label}>
          <g className="pp-node">
            <rect x={n.x} y={70} width={118} height={62} fill={C.card} stroke={n.accent ? C.signal : C.line} strokeWidth={n.accent ? 1.5 : 1} />
            <text x={n.x + 59} y={97} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.2" fill={n.accent ? C.signal : C.dim}>
              {n.label}
            </text>
            <T x={n.x + 59} y={112} textAnchor="middle" fontSize="7">{n.sub}</T>
          </g>
          {i < nodes.length - 1 && (
            <path className="pp-wire" d={`M${n.x + 118} 101 H${n.x + 138}`} pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} />
          )}
        </g>
      ))}

      {/* vision scanline */}
      <rect className="pp-scan" x={300} y={74} width={110} height={2} fill={C.signal} opacity={0.4} />

      {/* structured output schema */}
      <g className="pp-schema">
        <path d="M355 132 V172 H300" pathLength={1} fill="none" stroke={C.line} />
        <rect x={150} y={172} width={210} height={62} fill={C.card} stroke={C.line} />
        <T x={164} y={190} fill={C.dim} fontSize="8">{'{ "overhang": 0.42,'}</T>
        <T x={164} y={204} fill={C.dim} fontSize="8">{'  "layer_defect": true,'}</T>
        <T x={164} y={218} fill={C.dim} fontSize="8">{'  "recommend": [...] }'}</T>
        <T x={150} y={250} fill={C.signal} fontSize="7.5">SCHEMA-BOUND OUTPUT — NO FREE-TEXT PARSING</T>
      </g>

      {/* validation + gcode */}
      <path className="pp-wire" d="M631 132 V196 H520" pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} />
      <g className="pp-node">
        <rect x={400} y={172} width={120} height={54} fill={C.card} stroke={C.line} />
        <text x={460} y={195} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.2" fill={C.dim}>
          PRUSASLICER
        </text>
        <T x={460} y={210} textAnchor="middle" fontSize="7">CLI VALIDATION</T>
      </g>
      <g className="pp-node">
        <rect x={572} y={240} width={118} height={54} fill={C.card} stroke={C.green} />
        <text x={631} y={263} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.2" fill={C.green}>
          G-CODE
        </text>
        <T x={631} y={278} textAnchor="middle" fontSize="7">PRINT-READY</T>
      </g>
      <path className="pp-wire" d="M460 226 V267 H572" pathLength={1} strokeDasharray="1" fill="none" stroke={C.line} />

      {/* feedback loop: real prints recalibrate the model */}
      <path className="pp-loop" d="M631 294 V318 H706 V50 H493 V70" pathLength={1} strokeDasharray="1" fill="none" stroke={C.signal} strokeWidth="1" opacity={0.8} />
      <path className="pp-flow" d="M631 294 V318 H706 V50 H493 V70" strokeDasharray="4 12" fill="none" stroke={C.signal} strokeWidth="1.6" />
      <T className="pp-loop-t" x={356} y={336} fill={C.signal} fontSize="7.5">PRINT FEEDBACK → CONFORMAL RECALIBRATION</T>
    </svg>
  );
}
