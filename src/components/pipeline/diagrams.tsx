'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

/**
 * AirMed pipeline — one hand-drawn, scroll-driven diagram per step.
 * Each diagram builds a paused timeline and hands it to the page, which scrubs it
 * with the scroll position of its stage. Ambient loops (carets, spinners, pulses)
 * run independently so the drawing is alive even when the scroll is still.
 */
export type DiagramProps = { register: (tl: gsap.core.Timeline) => void };

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

const VB = '0 0 720 340';
const svgProps = {
  viewBox: VB,
  className: 'h-full w-full',
  preserveAspectRatio: 'xMinYMid meet' as const,
};

/** Box with mono label */
function B({
  x, y, w, h, label, sub, accent, cls,
}: {
  x: number; y: number; w: number; h: number; label?: string; sub?: string; accent?: boolean; cls?: string;
}) {
  return (
    <g className={cls}>
      <rect x={x} y={y} width={w} height={h} fill={C.card} stroke={accent ? C.signal : C.line} strokeWidth={accent ? 1.5 : 1} />
      {label && (
        <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 3.5)} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.4" fill={accent ? C.signal : C.dim}>
          {label}
        </text>
      )}
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.1" fill={C.faint}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** Wire that draws itself (pathLength=1, dash 1 → offset 0) */
function W({ d, cls, dashed, color }: { d: string; cls: string; dashed?: boolean; color?: string }) {
  return (
    <path
      className={cls}
      d={d}
      pathLength={1}
      strokeDasharray={dashed ? '0.02 0.02' : '1'}
      fill="none"
      stroke={color ?? C.line}
      strokeWidth="1"
    />
  );
}

const T = (props: React.SVGProps<SVGTextElement>) => (
  <text fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.2" fill={C.faint} {...props} />
);

/* ══════════════ 01 — FEATURE ISSUE ══════════════
   Admin clicks "request a feature" in the app; a GitHub issue writes itself. */
export function D1Issue({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.from('.d1-win', { autoAlpha: 0, duration: 0.4 })
      .set('.d1-cursor', { x: 330, y: 290 })
      .to('.d1-cursor', { x: 178, y: 196, duration: 1.2, ease: 'power2.inOut' })
      .to('.d1-btn', { fill: C.signal, duration: 0.12 }, '-=0.05')
      .to('.d1-btn-t', { fill: C.card, duration: 0.12 }, '<')
      .to('.d1-cursor', { scale: 0.86, duration: 0.08, transformOrigin: 'top left' }, '<')
      .to('.d1-cursor', { scale: 1, duration: 0.12, transformOrigin: 'top left' })
      .from('.d1-wire', { strokeDashoffset: 1, duration: 0.6, ease: 'power2.inOut' })
      .from('.d1-card', { autoAlpha: 0, x: -12, duration: 0.4 })
      .from('.d1-row', { autoAlpha: 0, x: -10, stagger: 0.14, duration: 0.35 })
      .from('.d1-chip', { autoAlpha: 0, scale: 0.7, stagger: 0.1, duration: 0.3, transformOrigin: 'center' });
    register(tl);

    gsap.to('.d1-led', { opacity: 0.2, duration: 0.7, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }, { scope: root });

  return (
    <svg ref={root} {...svgProps}>
      {/* admin panel */}
      <g className="d1-win">
        <rect x={30} y={70} width={250} height={175} fill={C.card} stroke={C.line} />
        <line x1={30} y1={98} x2={280} y2={98} stroke={C.line} />
        <circle cx={44} cy={84} r={3} fill={C.faint} />
        <T x={58} y={87}>ADMIN PANEL</T>
        <T x={50} y={130} fill={C.dim} fontSize="9">We need a recall list</T>
        <T x={50} y={146} fill={C.dim} fontSize="9">export for follow-ups.</T>
        <rect className="d1-btn" x={50} y={178} width={180} height={34} fill={C.card} stroke={C.signal} strokeWidth={1.5} />
        <text className="d1-btn-t" x={140} y={199} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.3" fill={C.signal}>
          REQUEST A FEATURE
        </text>
      </g>

      <W cls="d1-wire" d="M280 195 H320 V150 H360" />

      {/* issue card */}
      <g className="d1-card">
        <rect x={360} y={88} width={320} height={150} fill={C.card} stroke={C.line} />
        <line x1={360} y1={116} x2={680} y2={116} stroke={C.line} />
        <rect className="d1-led" x={374} y={99} width={6} height={6} fill={C.green} />
        <T x={390} y={105}>GITHUB ISSUE</T>
        <g className="d1-row">
          <text x={378} y={142} fontFamily="var(--font-mono)" fontSize="11" fill={C.signal} letterSpacing="1">#217</text>
          <T x={422} y={142} fill={C.dim} fontSize="9">Export the patient recall list</T>
        </g>
        <g className="d1-row">
          <T x={378} y={166}>OPENED FROM APP · ASSIGNED → AI SESSION</T>
        </g>
        <g className="d1-row">
          <T x={378} y={190}>SCOPED · LABELED · READY TO WORK</T>
        </g>
        <g transform="translate(378,206)">
          <g className="d1-chip">
            <rect x={0} y={0} width={62} height={18} fill="none" stroke={C.signal} />
            <text x={31} y={12.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill={C.signal}>FEATURE</text>
          </g>
        </g>
      </g>

      <g className="d1-cursor">
        <path d="M0 0 L0 15 L4.2 10.8 L7.4 17 L9.8 15.8 L6.6 9.7 L12 9.4 Z" fill={C.ink} />
      </g>
    </svg>
  );
}

/* ══════════════ 02 — PARALLEL SESSION ══════════════
   Main clone is hook-locked; three worktrees run their own AI session. */
export function D2Parallel({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.from('.d2-main', { autoAlpha: 0, duration: 0.4 })
      .from('.d2-lock', { autoAlpha: 0, scale: 1.6, duration: 0.4, transformOrigin: 'center' })
      .from('.d2-wire', { strokeDashoffset: 1, duration: 0.7, stagger: 0.18, ease: 'power2.inOut' }, '-=0.1')
      .from('.d2-wt', { autoAlpha: 0, x: -14, stagger: 0.18, duration: 0.4 }, '-=0.9');
    register(tl);

    gsap.to('.d2-caret', { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)', stagger: 0.2 });
  }, { scope: root });

  const lanes = [
    { y: 52, issue: '#217', branch: 'feat/recall-export', st: 'EDITING', c: C.green },
    { y: 138, issue: '#214', branch: 'feat/consent-form', st: 'TESTS', c: C.signal },
    { y: 224, issue: '#219', branch: 'fix/iol-version', st: 'REVIEW', c: C.faint },
  ];

  return (
    <svg ref={root} {...svgProps}>
      {/* main clone, locked */}
      <g className="d2-main">
        <rect x={24} y={122} width={170} height={94} fill={C.card} stroke={C.line} />
        <T x={109} y={148} textAnchor="middle">MAIN CLONE</T>
        <g className="d2-lock" transform="translate(109,178)">
          <rect x={-30} y={-14} width={60} height={28} fill="none" stroke={C.red} />
          <text x={0} y={4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill={C.red}>LOCKED</text>
        </g>
        <T x={109} y={208} textAnchor="middle" fontSize="7.5">PreToolUse HOOK BLOCKS EDITS</T>
      </g>

      {lanes.map((l, i) => (
        <g key={l.issue}>
          <W cls="d2-wire" d={`M194 169 H240 V${l.y + 40} H288`} />
          <g className="d2-wt">
            <rect x={288} y={l.y} width={330} height={80} fill={C.card} stroke={i === 0 ? C.signal : C.line} strokeWidth={i === 0 ? 1.5 : 1} />
            <T x={304} y={l.y + 24} fill={i === 0 ? C.signal : C.dim} fontSize="9.5">SESSION {String.fromCharCode(65 + i)}</T>
            <T x={304} y={l.y + 42} fontSize="8.5">worktree ../wt-{l.issue.slice(1)} · {l.issue}</T>
            <T x={304} y={l.y + 60} fill={C.dim} fontSize="8.5">{l.branch}</T>
            <rect className="d2-caret" x={412} y={l.y + 52} width={5} height={10} fill={l.c} />
            <text x={588} y={l.y + 24} textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.2" fill={l.c}>
              {l.st}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════ 03 — FAST GATE ══════════════
   The PR travels through three blocking gates; each stamps green and lifts. */
export function D3Gate({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.from('.d3-track', { strokeDashoffset: 1, duration: 0.5, ease: 'none' })
      .from('.d3-gate', { autoAlpha: 0, stagger: 0.1, duration: 0.3 }, '-=0.2')
      .set('.d3-pr', { x: 46 });

    // PR moves gate to gate; each gate lifts + checks as it clears
    // durak noktaları: kapı merkezleri (184 · 349 · 514), PR karesinin merkezi tam kapıya otursun
    [0, 1, 2].forEach((i) => {
      tl.to('.d3-pr', { x: 184 + i * 165, duration: 0.7, ease: 'power1.inOut' })
        .to(`.d3-bar-${i}`, { y: -34, duration: 0.3, ease: 'power2.out' }, '-=0.15')
        .from(`.d3-check-${i}`, { strokeDashoffset: 1, duration: 0.3 }, '<');
    });
    tl.to('.d3-pr', { x: 560, duration: 0.6, ease: 'power1.in' })
      .from('.d3-pass', { autoAlpha: 0, y: 8, duration: 0.4 }, '-=0.2');
    register(tl);

    gsap.to('.d3-pr-glow', { opacity: 0.25, duration: 0.9, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }, { scope: root });

  const gates = ['LINT · 0 WARN', 'TSC --STRICT', 'UNIT TESTS'];

  return (
    <svg ref={root} {...svgProps}>
      <W cls="d3-track" d="M30 200 H594" />
      <T x={30} y={228}>PR OPENED</T>
      <T x={690} y={244} textAnchor="end">MERGE UNBLOCKED</T>

      {gates.map((g, i) => {
        const x = 190 + i * 165;
        return (
          <g className="d3-gate" key={g}>
            <line x1={x} y1={96} x2={x} y2={200} stroke={C.line} strokeDasharray="3 3" />
            <g className={`d3-bar-${i}`}>
              <rect x={x - 5} y={140} width={10} height={58} fill={C.signal} />
            </g>
            <T x={x} y={88} textAnchor="middle" fill={C.dim}>{g}</T>
            <path
              className={`d3-check-${i}`}
              d={`M${x + 13} 118 l6 7 l12 -15`}
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke={C.green}
              strokeWidth="2"
            />
            <T x={x} y={252} textAnchor="middle" fontSize="7">SELF-HOSTED RUNNER</T>
          </g>
        );
      })}

      <g className="d3-pr">
        <rect className="d3-pr-glow" x={-12} y={182} width={36} height={36} fill={C.signal} opacity={0.18} />
        <rect x={-6} y={188} width={24} height={24} fill={C.signal} />
        <T x={6} y={176} textAnchor="middle" fill={C.signal} fontSize="7.5">PR</T>
      </g>

      <g className="d3-pass">
        <rect x={600} y={176} width={90} height={48} fill="none" stroke={C.green} />
        <text x={645} y={198} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.2" fill={C.green}>GATE</text>
        <text x={645} y={214} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6" fill={C.green}>PASS</text>
      </g>
    </svg>
  );
}

/* ══════════════ 04 — STAGE GROUPS ══════════════
   Ordered e2e groups, each worker on its own isolated database. */
export function D4Groups({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    [0, 1, 2].forEach((g) => {
      tl.from(`.d4-row-${g}`, { autoAlpha: 0, x: -12, duration: 0.3 })
        .from(`.d4-tick-${g}`, { scaleY: 0, transformOrigin: 'bottom', stagger: 0.03, duration: 0.18, ease: 'power2.out' })
        .from(`.d4-db-${g}`, { autoAlpha: 0, duration: 0.25 }, '-=0.5');
      if (g < 2) tl.from(`.d4-done-${g}`, { strokeDashoffset: 1, duration: 0.3 });
    });
    tl.from('.d4-running', { autoAlpha: 0, duration: 0.3 });
    register(tl);

    gsap.to('.d4-spin', { rotate: 360, transformOrigin: 'center', duration: 1.6, repeat: -1, ease: 'none' });
    // çalışan grupta yalnızca sıradaki spec yanıp söner
    gsap.to('.d4-tick-live', { opacity: 0.25, duration: 0.6, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }, { scope: root });

  const groups = [
    { n: '1/3', name: 'CORE-FLOWS', ticks: 22 },
    { n: '2/3', name: 'ASSISTANT-E2E', ticks: 18 },
    { n: '3/3', name: 'TENANT-ISOLATION', ticks: 14 },
  ];

  return (
    <svg ref={root} {...svgProps}>
      {groups.map((g, i) => {
        const y = 70 + i * 84;
        return (
          <g key={g.n}>
            <g className={`d4-row-${i}`}>
              <T x={30} y={y + 4} fill={C.dim} fontSize="9">STAGE GROUP {g.n}</T>
              <T x={30} y={y + 20} fontSize="8">{g.name}</T>
            </g>
            {/* spec ticks */}
            <g>
              {Array.from({ length: g.ticks }).map((_, t) => (
                <rect
                  key={t}
                  className={`d4-tick-${i}${i === 2 && t === 6 ? ' d4-tick-live' : ''}`}
                  x={210 + t * 13}
                  y={y - 12}
                  width={7}
                  height={26}
                  fill={i === 2 ? (t < 6 ? C.green : t === 6 ? C.signal : C.line) : C.green}
                />
              ))}
            </g>
            {/* isolated db per worker */}
            <g className={`d4-db-${i}`} transform={`translate(560,${y - 12})`}>
              <ellipse cx={22} cy={4} rx={22} ry={6} fill="none" stroke={C.line} />
              <path d="M0 4 V22 a22 6 0 0 0 44 0 V4" fill="none" stroke={C.line} />
              <T x={56} y={16} fontSize="7">ISOLATED DB</T>
            </g>
            {i < 2 && (
              <path className={`d4-done-${i}`} d={`M690 ${y - 4} l6 7 l12 -15`} pathLength={1} strokeDasharray="1" fill="none" stroke={C.green} strokeWidth="2" />
            )}
          </g>
        );
      })}

      <g className="d4-running" transform="translate(700,239)">
        <g className="d4-spin">
          <circle cx={0} cy={0} r={9} fill="none" stroke={C.signal} strokeWidth="2" strokeDasharray="14 10" />
        </g>
      </g>
      <T x={30} y={312} fontSize="7.5">SCHEDULED · ON DEMAND · ONE DATABASE PER WORKER</T>
    </svg>
  );
}

/* ══════════════ 05 — AUTO STAGING ══════════════
   Squash-merge builds and ships over a private mesh. No public surface. */
export function D5Staging({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    gsap.set('.d5-flow', { opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.from('.d5-branch', { strokeDashoffset: 1, duration: 0.5, ease: 'power2.inOut' })
      .from('.d5-main', { strokeDashoffset: 1, duration: 0.5, ease: 'none' }, '-=0.3')
      .from('.d5-node', { scale: 0, transformOrigin: 'center', duration: 0.35, ease: 'back.out(2)' })
      .from('.d5-squash', { autoAlpha: 0, duration: 0.3 }, '<')
      .from('.d5-build', { autoAlpha: 0, y: 10, duration: 0.35 })
      .from('.d5-layer', { scaleX: 0, transformOrigin: 'left', stagger: 0.09, duration: 0.25 })
      .from('.d5-tunnel', { strokeDashoffset: 1, duration: 0.7, ease: 'power2.inOut' })
      .from('.d5-box', { autoAlpha: 0, x: -10, duration: 0.35 })
      .from('.d5-smoke', { autoAlpha: 0, stagger: 0.12, duration: 0.25 })
      .from('.d5-noweb', { autoAlpha: 0, scale: 1.4, transformOrigin: 'center', duration: 0.3 });
    register(tl);

    gsap.set('.d5-flow', { opacity: 0 });
    tl.to('.d5-flow', { opacity: 1, duration: 0.01 }, 2.05);

    gsap.fromTo('.d5-flow', { strokeDashoffset: 0 }, { strokeDashoffset: -40, duration: 1.6, repeat: -1, ease: 'none' });
    gsap.to('.d5-live', { opacity: 0.2, duration: 0.8, repeat: -1, yoyo: true });
  }, { scope: root });

  return (
    <svg ref={root} {...svgProps}>
      <W cls="d5-branch" d="M30 250 C 90 250, 100 160, 160 160" />
      <W cls="d5-main" d="M30 160 H160" />
      <T x={30} y={148}>MAIN</T>
      <T x={30} y={272}>feat/recall-export</T>

      <circle className="d5-node" cx={160} cy={160} r={7} fill={C.signal} />
      <T className="d5-squash" x={160} y={132} textAnchor="middle" fill={C.signal}>SQUASH MERGE</T>

      {/* build */}
      <g className="d5-build">
        <rect x={210} y={116} width={140} height={88} fill={C.card} stroke={C.line} />
        <T x={280} y={106} textAnchor="middle" fill={C.dim}>BUILD · CACHED</T>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} className="d5-layer" x={224} y={130 + i * 17} width={112} height={11} fill={i === 3 ? C.signal : C.line} opacity={i === 3 ? 1 : 0.55} />
        ))}
      </g>

      {/* tailscale tunnel */}
      <W cls="d5-tunnel" d="M350 160 H470" dashed />
      <path className="d5-flow" d="M350 160 H470" strokeDasharray="4 8" fill="none" stroke={C.signal} strokeWidth="1.5" />
      <T x={410} y={148} textAnchor="middle" fill={C.signal} fontSize="7.5">TAILSCALE MESH</T>
      <T x={410} y={182} textAnchor="middle" fontSize="7">PRIVATE · ENCRYPTED</T>

      {/* staging box */}
      <g className="d5-box">
        <rect x={470} y={116} width={180} height={88} fill={C.card} stroke={C.line} />
        <rect className="d5-live" x={486} y={132} width={6} height={6} fill={C.green} />
        <T x={502} y={138} fill={C.dim} fontSize="9">STAGING</T>
        <g className="d5-smoke"><T x={486} y={162} fill={C.green} fontSize="8">✓ smoke: auth</T></g>
        <g className="d5-smoke"><T x={486} y={178} fill={C.green} fontSize="8">✓ smoke: booking</T></g>
        <g className="d5-smoke"><T x={486} y={194} fill={C.green} fontSize="8">✓ smoke: assistant</T></g>
      </g>

      {/* no public surface */}
      <g className="d5-noweb" transform="translate(492,272)">
        <circle cx={0} cy={0} r={13} fill="none" stroke={C.faint} />
        <ellipse cx={0} cy={0} rx={6} ry={13} fill="none" stroke={C.faint} />
        <line x1={-13} y1={0} x2={13} y2={0} stroke={C.faint} />
        <line x1={-12} y1={-12} x2={12} y2={12} stroke={C.red} strokeWidth="1.5" />
        <T x={24} y={4} fontSize="7.5">NO PUBLIC DNS · NO OPEN PORTS</T>
      </g>
    </svg>
  );
}

/* ══════════════ 06 — PRODUCTION ══════════════
   Two backups, migration rehearsed on a copy, health check, auto-rollback. */
export function D6Production({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.from('.d6-b1', { autoAlpha: 0, scale: 0.85, transformOrigin: 'center', duration: 0.3 })
      .from('.d6-b2', { autoAlpha: 0, scale: 0.85, transformOrigin: 'center', duration: 0.3 })
      .from('.d6-w1', { strokeDashoffset: 1, duration: 0.45 })
      .from('.d6-copy', { autoAlpha: 0, y: -8, duration: 0.35 })
      .from('.d6-rehearse', { strokeDashoffset: 1, duration: 0.6, ease: 'power2.inOut' })
      .from('.d6-rok', { strokeDashoffset: 1, duration: 0.3 })
      .from('.d6-w2', { strokeDashoffset: 1, duration: 0.5 })
      .from('.d6-live', { autoAlpha: 0, y: 10, duration: 0.35 })
      .from('.d6-health', { strokeDashoffset: 1, duration: 0.5, ease: 'none' })
      .from('.d6-rollback', { strokeDashoffset: 1, duration: 0.7, ease: 'power2.inOut' });
    register(tl);

    gsap.set(['.d6-rb-flow', '.d6-rb-label'], { opacity: 0 });
    tl.to(['.d6-rb-flow', '.d6-rb-label'], { opacity: 1, duration: 0.01 }, '>-0.05');

    gsap.to('.d6-beat', { scale: 1.35, transformOrigin: 'center', duration: 0.45, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.fromTo('.d6-rb-flow', { strokeDashoffset: 0 }, { strokeDashoffset: -32, duration: 1.4, repeat: -1, ease: 'none' });
  }, { scope: root });

  const Disc = ({ x, y, cls, label }: { x: number; y: number; cls: string; label: string }) => (
    <g className={cls} transform={`translate(${x},${y})`}>
      <ellipse cx={26} cy={6} rx={26} ry={7} fill={C.card} stroke={C.line} />
      <path d="M0 6 V30 a26 7 0 0 0 52 0 V6" fill={C.card} stroke={C.line} />
      <T x={26} y={52} textAnchor="middle" fontSize="7.5">{label}</T>
    </g>
  );

  return (
    <svg ref={root} {...svgProps}>
      <Disc x={40} y={58} cls="d6-b1" label="BACKUP 1 · FULL" />
      <Disc x={40} y={158} cls="d6-b2" label="BACKUP 2 · OFFSITE" />

      <W cls="d6-w1" d="M92 82 H140 V128 H196" />
      <W cls="d6-w1" d="M92 182 H140 V128" />

      {/* rehearsal on a copy */}
      <g className="d6-copy">
        <rect x={196} y={90} width={150} height={76} fill={C.card} stroke={C.line} strokeDasharray="4 3" />
        <T x={271} y={118} textAnchor="middle" fill={C.dim} fontSize="9">DB COPY</T>
        <T x={271} y={136} textAnchor="middle" fontSize="7.5">MIGRATION REHEARSAL</T>
      </g>
      <path className="d6-rehearse" d="M212 152 H314" pathLength={1} strokeDasharray="1" fill="none" stroke={C.signal} strokeWidth="1.5" />
      <path className="d6-rok" d="M320 149 l5 6 l10 -13" pathLength={1} strokeDasharray="1" fill="none" stroke={C.green} strokeWidth="2" />

      <W cls="d6-w2" d="M346 128 H400 V180 H448" />

      {/* live db + deploy */}
      <g className="d6-live">
        <rect x={448} y={140} width={200} height={80} fill={C.card} stroke={C.signal} strokeWidth={1.5} />
        <T x={548} y={168} textAnchor="middle" fill={C.signal} fontSize="9.5">PRODUCTION</T>
        <T x={548} y={186} textAnchor="middle" fontSize="7.5">MIGRATE DEPLOY · CLINIC APPLIANCE</T>
        <g className="d6-beat" transform="translate(548,204)">
          <path d="M-6 0 a4 4 0 0 1 6 -3 a4 4 0 0 1 6 3 c0 4 -6 8 -6 8 s-6 -4 -6 -8 z" fill={C.green} />
        </g>
      </g>
      <path className="d6-health" d="M448 250 h34 l10 -22 l12 44 l12 -30 l10 8 h122" pathLength={1} strokeDasharray="1" fill="none" stroke={C.green} strokeWidth="1.2" />
      <T x={568} y={238} fontSize="7.5">HEALTH CHECK</T>

      {/* rollback */}
      <path className="d6-rollback" d="M648 206 C 700 240, 668 306, 400 306 C 250 306, 152 296, 142 140" pathLength={1} strokeDasharray="1" fill="none" stroke={C.red} strokeWidth="1" />
      <path className="d6-rb-flow" d="M648 206 C 700 240, 668 306, 400 306 C 250 306, 152 296, 142 140" strokeDasharray="3 9" fill="none" stroke={C.red} strokeWidth="1.5" />
      <path className="d6-rb-flow" d="M137 141 l5 -8 l5 8" fill="none" stroke={C.red} strokeWidth="1.4" strokeDasharray="none" />
      <T className="d6-rb-label" x={400} y={326} textAnchor="middle" fill={C.red} fontSize="7.5">ON FAILURE → AUTO-ROLLBACK</T>
    </svg>
  );
}

/* ══════════════ 07 — THE LOOP ══════════════
   Production error → log watcher → issue → agent PR → the same gates again. */
export function D7Loop({ register }: DiagramProps) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.from('.d7-node', { autoAlpha: 0, scale: 0.9, transformOrigin: 'center', stagger: 0.16, duration: 0.35 })
      .from('.d7-wire', { strokeDashoffset: 1, stagger: 0.14, duration: 0.5, ease: 'power2.inOut' }, '-=1.1')
      .from('.d7-bolt-wrap', { autoAlpha: 0, scale: 0.4, transformOrigin: 'center', duration: 0.3 }, '-=0.6')
      .from('.d7-scrub', { autoAlpha: 0, duration: 0.3 })
      .from('.d7-arc', { strokeDashoffset: 1, duration: 1, ease: 'power2.inOut' })
      .from('.d7-back', { autoAlpha: 0, duration: 0.3 });
    register(tl);

    gsap.set('.d7-orbit', { opacity: 0 });
    tl.to('.d7-orbit', { opacity: 1, duration: 0.01 }, '>-0.35');

    gsap.fromTo('.d7-orbit', { strokeDashoffset: 0 }, { strokeDashoffset: -60, duration: 2.4, repeat: -1, ease: 'none' });
    gsap.to('.d7-bolt', { opacity: 0.4, duration: 0.55, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }, { scope: root });

  const nodes = [
    { x: 24, label: 'PRODUCTION', sub: 'ERROR THROWN' },
    { x: 196, label: 'LOG WATCHER', sub: 'PII SCRUBBED' },
    { x: 368, label: 'ISSUE', sub: 'AUTO-OPENED' },
    { x: 540, label: 'AGENT', sub: 'DRAFTS PR' },
  ];

  return (
    <svg ref={root} {...svgProps}>
      {nodes.map((n, i) => (
        <g key={n.label}>
          <B cls="d7-node" x={n.x} y={104} w={156} h={72} label={n.label} sub={n.sub} accent={i === 3} />
          {i < 3 && <W cls="d7-wire" d={`M${n.x + 156} 140 H${n.x + 172}`} />}
        </g>
      ))}

      <g className="d7-bolt-wrap" transform="translate(102,84)">
        <path className="d7-bolt" d="M2 -22 L-8 -2 L0 -2 L-3 16 L9 -6 L1 -6 Z" fill={C.red} />
      </g>
      <T className="d7-scrub" x={274} y={198} textAnchor="middle" fontSize="7.5">NO PATIENT DATA LEAVES THE BOX</T>

      {/* back to step 01 */}
      <path
        className="d7-arc"
        d="M618 176 C 618 268, 480 288, 300 288 C 140 288, 102 262, 102 186"
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke={C.signal}
        strokeWidth="1.2"
      />
      <path
        className="d7-orbit"
        d="M618 176 C 618 268, 480 288, 300 288 C 140 288, 102 262, 102 186"
        strokeDasharray="5 15"
        fill="none"
        stroke={C.signal}
        strokeWidth="2"
      />
      <path className="d7-arc" d="M97 190 l5 -8 l5 8" fill="none" stroke={C.signal} strokeWidth="1.4" />
      <T className="d7-back" x={360} y={308} textAnchor="middle" fill={C.signal} fontSize="8">
        ↺ SAME GATES · SAME GUARDRAILS · HUMANS MERGE
      </T>
    </svg>
  );
}

export const DIAGRAMS = [D1Issue, D2Parallel, D3Gate, D4Groups, D5Staging, D6Production, D7Loop];
