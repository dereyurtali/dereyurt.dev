'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

// AirMed'in gerçek mimarisi, sayfanın çizim dilinde canlı bir şema olarak:
// kanallar → Chatwoot → LLM asistan (tool loop) → domain modülleri → RLS'li Postgres.
// Hat çizgileri scroll'da çizilir; turuncu veri pulsları sürekli akar.

const INK = 'var(--color-line-2)';
const DIM = 'var(--color-ink-dim)';
const FAINT = 'var(--color-ink-faint)';
const SIGNAL = 'var(--color-signal)';
const CARD = 'var(--color-card)';

function Box({
  x, y, w, h, label, sub, accent = false,
}: {
  x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean;
}) {
  return (
    <g className="sch-box">
      <rect x={x} y={y} width={w} height={h} fill={CARD} stroke={accent ? SIGNAL : INK} strokeWidth={accent ? 1.5 : 1} />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 4 : h / 2 + 3.5)}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1.5"
        fill={accent ? SIGNAL : DIM}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7.5"
          letterSpacing="1.2"
          fill={FAINT}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

const LINES = [
  'M136 82 H166 V172 H196',   // whatsapp → chatwoot
  'M136 172 H196',            // telegram → chatwoot
  'M136 262 H166 V172 H196',  // instagram → chatwoot
  'M306 172 H346',            // chatwoot → assistant
  'M496 172 H528 V80 H560',   // assistant → appointments
  'M496 172 H528 V156 H560',  // assistant → patients (elbow shares bus)
  'M496 172 H528 V232 H560',  // assistant → billing
  'M700 80 H728 V380',        // appointments → db bus
  'M700 156 H728 V380',       // patients → db bus
  'M700 232 H728 V380',       // billing → db bus
  'M421 208 V380',            // assistant → db (three-phase tx)
];

export default function AirmedSchematic() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current!;

      // şema scroll'la çizilir: kutular oturur, hatlar kaydırdıkça uzar
      const draw = gsap.timeline({
        scrollTrigger: { trigger: svg, start: 'top 90%', end: 'bottom 55%', scrub: 0.8 },
      });
      draw
        .from(svg.querySelectorAll('.sch-box'), { autoAlpha: 0, y: 8, stagger: 0.5, duration: 1.2 })
        .fromTo(
          svg.querySelectorAll('.sch-line'),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, stagger: 0.4, duration: 1.6, ease: 'none' },
          0.6
        );

      // veri pulsları — süresiz akar
      svg.querySelectorAll<SVGPathElement>('.sch-pulse').forEach((el, i) => {
        gsap.to(el, {
          strokeDashoffset: -200,
          duration: gsap.utils.random(2.6, 4.2),
          delay: i * 0.35,
          repeat: -1,
          ease: 'none',
        });
      });

      // asistan durum LED'i
      gsap.to(svg.querySelector('.sch-led'), {
        opacity: 0.15,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 760 480"
      className="mx-auto h-auto w-full max-w-[720px]"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="AirMed HBYS system architecture: messaging channels flow through Chatwoot into the LLM assistant, which drives clinic modules on a row-level-secure PostgreSQL database"
    >
      {/* hatlar: taban çizgi + üzerinde akan turuncu puls */}
      {LINES.map((d) => (
        <g key={d}>
          <path className="sch-line" d={d} pathLength={100} strokeDasharray="100" fill="none" stroke={INK} strokeWidth="1" />
          <path className="sch-pulse" d={d} pathLength={100} strokeDasharray="7 93" fill="none" stroke={SIGNAL} strokeWidth="2" />
        </g>
      ))}

      {/* kanallar */}
      <Box x={16} y={60} w={120} h={44} label="WHATSAPP" />
      <Box x={16} y={150} w={120} h={44} label="TELEGRAM" />
      <Box x={16} y={240} w={120} h={44} label="INSTAGRAM" />

      {/* ingress */}
      <Box x={196} y={150} w={110} h={44} label="CHATWOOT" sub="SIGNED WEBHOOK" />

      {/* asistan */}
      <Box x={346} y={136} w={150} h={72} label="LLM ASSISTANT" sub="AGENTIC TOOL LOOP" accent />
      <rect className="sch-led" x={484} y={142} width={6} height={6} fill={SIGNAL} />

      {/* domain modülleri */}
      <Box x={560} y={60} w={140} h={40} label="APPOINTMENTS" />
      <Box x={560} y={136} w={140} h={40} label="PATIENTS" />
      <Box x={560} y={212} w={140} h={40} label="BILLING" />

      {/* üç fazlı tx notu */}
      <text x={430} y={300} fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill={FAINT}>
        3-PHASE TX — MODEL LOOP
      </text>
      <text x={430} y={312} fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill={FAINT}>
        NEVER HOLDS A CONNECTION
      </text>

      {/* veritabanı */}
      <Box x={346} y={380} w={382} h={52} label="POSTGRESQL 16 — ROW-LEVEL SECURITY" sub="95 MODELS · 115 MIGRATIONS · TENANT ISOLATION" />
    </svg>
  );
}
