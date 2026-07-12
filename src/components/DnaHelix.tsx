'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

// DNA'nın adını figüre çeviriyoruz: çift sarmal, baz çiftleri stüdyonun dört
// yetenek alanı. Strandlar scroll'da çizilir, üzerlerinde turuncu puls akar.

const INK = 'var(--color-line-2)';
const FAINT = 'var(--color-ink-faint)';
const SIGNAL = 'var(--color-signal)';

const CX = 100;
const AMP = 52;
const TOP = 24;
const BOTTOM = 416;
const TURNS = 2.5;
const N = 100;

// phase = 5πt, so |sin| peaks exactly at t = 0.1, 0.3, 0.5, 0.7 — the four
// callout rungs land on the widest points of the helix, never on a crossing.
const phase = (t: number) => Math.sin(t * TURNS * Math.PI * 2);
const yAt = (t: number) => TOP + t * (BOTTOM - TOP);

const strand = (sign: number) =>
  Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    return `${i === 0 ? 'M' : 'L'}${(CX + sign * AMP * phase(t)).toFixed(1)} ${yAt(t).toFixed(1)}`;
  }).join(' ');

const STRANDS = [strand(1), strand(-1)];

// step 5, so the four callout rungs (i = 10, 30, 50, 70) exist on this grid.
const RUNGS = Array.from({ length: N / 5 + 1 }, (_, k) => {
  const i = k * 5;
  const t = i / N;
  const s = phase(t);
  return { i, y: yAt(t), x1: CX + AMP * s, x2: CX - AMP * s, depth: Math.abs(s) };
});

const CALLOUTS: Record<number, string> = {
  10: 'AI & AUTOMATION',
  30: 'SAAS PLATFORMS',
  50: 'HEALTHCARE',
  70: 'CLOUD & INFRA',
};

export default function DnaHelix() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;

      const draw = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 90%', end: 'bottom 60%', scrub: 0.8 },
      });
      draw
        .fromTo(
          svg.querySelectorAll('.dna-strand'),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 2, stagger: 0.2, ease: 'none' }
        )
        .from(svg.querySelectorAll('.dna-rung'), { autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.4)
        .from(svg.querySelectorAll('.dna-callout'), { autoAlpha: 0, x: -6, duration: 0.5, stagger: 0.25 }, 1.4);

      // baz dizisi boyunca akan veri — scroll dursa da figür canlı kalır
      svg.querySelectorAll<SVGPathElement>('.dna-pulse').forEach((el, i) => {
        gsap.to(el, {
          strokeDashoffset: -100,
          duration: 6,
          delay: i * 1.6,
          repeat: -1,
          ease: 'none',
        });
      });

      gsap.to(svg.querySelectorAll('.dna-node'), {
        opacity: 0.25,
        duration: 1.1,
        stagger: { each: 0.3, repeat: -1, yoyo: true },
        ease: 'power1.inOut',
      });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 300 440"
      className="h-auto w-full max-w-[360px]"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A double helix figure: the four base pairs are labelled with the studio's capability areas — AI and automation, SaaS platforms, healthcare, cloud and infrastructure"
    >
      {RUNGS.map((r) => (
        <line
          key={r.i}
          className="dna-rung"
          x1={r.x1}
          y1={r.y}
          x2={r.x2}
          y2={r.y}
          stroke={r.i in CALLOUTS ? SIGNAL : INK}
          strokeWidth={r.i in CALLOUTS ? 1.5 : 1}
          opacity={r.i in CALLOUTS ? 1 : 0.3 + 0.5 * r.depth}
        />
      ))}

      {STRANDS.map((d, i) => (
        <g key={d}>
          <path
            className="dna-strand"
            d={d}
            pathLength={100}
            strokeDasharray="100"
            fill="none"
            stroke={INK}
            strokeWidth="1.25"
          />
          <path
            className="dna-pulse"
            d={d}
            pathLength={100}
            strokeDasharray="5 95"
            fill="none"
            stroke={SIGNAL}
            strokeWidth="2.5"
            aria-hidden
          />
          <title>{i === 0 ? 'strand A' : 'strand B'}</title>
        </g>
      ))}

      {Object.entries(CALLOUTS).map(([key, label]) => {
        const r = RUNGS.find((x) => x.i === Number(key))!;
        const right = Math.max(r.x1, r.x2);
        return (
          <g key={key} className="dna-callout">
            <rect x={right - 2.5} y={r.y - 2.5} width={5} height={5} fill={SIGNAL} className="dna-node" />
            <line x1={right + 4} y1={r.y} x2={168} y2={r.y} stroke={SIGNAL} strokeWidth="0.75" />
            <text
              x={173}
              y={r.y + 3}
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              letterSpacing="1.1"
              fill={FAINT}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
