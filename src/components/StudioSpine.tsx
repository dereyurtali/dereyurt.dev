'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

/**
 * The studio's spine.
 *
 * The first attempt at this was a double helix sitting in its own bordered box
 * beside the text — a decoration, and a thin one. This is the same idea doing
 * structural work instead: the strand runs the full width of the band, and each
 * of its four base pairs drops a leader line into one of the four capability
 * cells directly below it. Nothing is framed; the drawing is what holds the row
 * together.
 *
 * preserveAspectRatio="none" lets the strand stretch to any width; the strokes
 * keep their weight because of vector-effect, and there is no <text> in here to
 * be distorted — the cells underneath are the labels.
 */

const INK = 'var(--color-line-2)';
const SIGNAL = 'var(--color-signal)';

const W = 1200;
const H = 110;
const MID = 46; // strand centreline
const AMP = 28;
const PERIOD = 600;
const BOTTOM = H; // where the leaders meet the cell row

// |sin| peaks at 150 / 450 / 750 / 1050 — the centres of four equal columns.
const wave = (x: number) => Math.sin((x / PERIOD) * Math.PI * 2);
const NODES = [150, 450, 750, 1050];

// Server and client disagree on Math.sin's last bit (different libm), and any
// raw float here becomes a hydration mismatch. Two decimals is far below a
// visible difference and identical on both sides.
const round = (n: number) => Math.round(n * 100) / 100;

const strand = (sign: number) =>
  Array.from({ length: 121 }, (_, i) => {
    const x = (i / 120) * W;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${(MID + sign * AMP * wave(x)).toFixed(1)}`;
  }).join(' ');

const STRANDS = [strand(1), strand(-1)];

const RUNGS = Array.from({ length: 49 }, (_, i) => {
  const x = (i / 48) * W;
  const s = wave(x);
  return {
    x: round(x),
    y1: round(MID + AMP * s),
    y2: round(MID - AMP * s),
    opacity: round(0.18 + 0.4 * Math.abs(s)),
  };
});

export default function StudioSpine({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;

      const draw = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 92%', end: 'bottom 55%', scrub: 0.8 },
      });
      draw
        .fromTo(
          svg.querySelectorAll('.sp-strand'),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 2, stagger: 0.15, ease: 'none' }
        )
        .from(svg.querySelectorAll('.sp-rung'), { autoAlpha: 0, duration: 0.5, stagger: 0.02 }, 0.5)
        .fromTo(
          svg.querySelectorAll('.sp-leader'),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 0.6, stagger: 0.18, ease: 'none' },
          1.5
        )
        .from(svg.querySelectorAll('.sp-node'), { scale: 0, transformOrigin: 'center', duration: 0.4, stagger: 0.18 }, 1.6);

      // the strand keeps carrying something even when the page is still
      svg.querySelectorAll<SVGPathElement>('.sp-pulse').forEach((el, i) => {
        gsap.to(el, {
          strokeDashoffset: -100,
          duration: 7,
          delay: i * 1.8,
          repeat: -1,
          ease: 'none',
        });
      });

      gsap.to(svg.querySelectorAll('.sp-node'), {
        opacity: 0.3,
        duration: 1.2,
        stagger: { each: 0.4, repeat: -1, yoyo: true },
        ease: 'power1.inOut',
      });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {RUNGS.map((r) => (
        <line
          key={r.x}
          className="sp-rung"
          x1={r.x}
          y1={r.y1}
          x2={r.x}
          y2={r.y2}
          stroke={INK}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity={r.opacity}
        />
      ))}

      {STRANDS.map((d) => (
        <g key={d}>
          <path
            className="sp-strand"
            d={d}
            pathLength={100}
            strokeDasharray="100"
            fill="none"
            stroke={INK}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="sp-pulse"
            d={d}
            pathLength={100}
            strokeDasharray="4 96"
            fill="none"
            stroke={SIGNAL}
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      {/* each base pair hands off to the capability cell underneath it */}
      {NODES.map((x) => {
        const y = round(MID + AMP * wave(x));
        const yTop = round(MID - AMP * wave(x));
        const low = Math.max(y, yTop);
        return (
          <g key={x}>
            <line
              x1={x}
              y1={Math.min(y, yTop)}
              x2={x}
              y2={low}
              stroke={SIGNAL}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className="sp-leader"
              x1={x}
              y1={low}
              x2={x}
              y2={BOTTOM}
              pathLength={100}
              strokeDasharray="100"
              stroke={SIGNAL}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <rect className="sp-node" x={x - 3} y={low - 3} width={6} height={6} fill={SIGNAL} />
          </g>
        );
      })}
    </svg>
  );
}
