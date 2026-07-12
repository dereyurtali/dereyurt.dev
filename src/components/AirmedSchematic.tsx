'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

// AirMed'in gerçek mimarisi, sayfanın çizim dilinde canlı bir şema olarak:
// kanallar → Chatwoot → LLM asistan (tool loop) → domain modülleri → RLS'li Postgres.
// Hat çizgileri scroll'da çizilir; turuncu veri pulsları sürekli akar.
//
// İki yerleşim, tek animasyon: geniş (yatay, masaüstü) ve kompakt (dikey, telefon).
// Kompakt olmadan 760'lık viewBox 316px'e sıkışıyor ve 10px'lik etiketler 3px'e
// düşüp okunmaz hale geliyordu.

const INK = 'var(--color-line-2)';
const DIM = 'var(--color-ink-dim)';
const FAINT = 'var(--color-ink-faint)';
const SIGNAL = 'var(--color-signal)';
const CARD = 'var(--color-card)';

function Box({
  x, y, w, h, label, sub, accent = false, fs = 10, fsSub = 7.5,
}: {
  x: number; y: number; w: number; h: number; label: string; sub?: string;
  accent?: boolean; fs?: number; fsSub?: number;
}) {
  return (
    <g className="sch-box">
      <rect x={x} y={y} width={w} height={h} fill={CARD} stroke={accent ? SIGNAL : INK} strokeWidth={accent ? 1.5 : 1} />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 4 : h / 2 + 3.5)}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={fs}
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
          fontSize={fsSub}
          letterSpacing="1.2"
          fill={FAINT}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

const LINES_WIDE = [
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

const LINES_COMPACT = [
  'M170 60 V100',             // channels → chatwoot
  'M170 144 V184',            // chatwoot → assistant
  'M170 244 V266 H63 V290',   // assistant → appointments
  'M170 244 V290',            // assistant → patients
  'M170 244 V266 H259 V290',  // assistant → billing
  'M63 328 V356 H259',        // module bus
  'M170 328 V356',
  'M259 328 V356',
  'M170 356 V382',            // bus → db
  'M310 214 H316 V382',       // assistant → db (three-phase tx), down the margin
];

const ARIA =
  'AirMed HBYS system architecture: messaging channels flow through Chatwoot into the LLM assistant, which drives clinic modules on a row-level-secure PostgreSQL database';

export default function AirmedSchematic({
  variant = 'wide',
  className,
}: {
  variant?: 'wide' | 'compact';
  className?: string;
}) {
  const root = useRef<SVGSVGElement>(null);
  const compact = variant === 'compact';
  const lines = compact ? LINES_COMPACT : LINES_WIDE;

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
      viewBox={compact ? '0 0 340 480' : '0 0 760 480'}
      className={className ?? 'mx-auto h-auto w-full max-w-[720px]'}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={ARIA}
    >
      {/* hatlar: taban çizgi + üzerinde akan turuncu puls */}
      {lines.map((d) => (
        <g key={d}>
          <path className="sch-line" d={d} pathLength={100} strokeDasharray="100" fill="none" stroke={INK} strokeWidth="1" />
          <path className="sch-pulse" d={d} pathLength={100} strokeDasharray="7 93" fill="none" stroke={SIGNAL} strokeWidth="2" />
        </g>
      ))}

      {compact ? (
        <>
          <Box x={40} y={16} w={260} h={44} label="CHANNELS" sub="WHATSAPP · TELEGRAM · INSTAGRAM" fs={11} fsSub={8} />
          <Box x={40} y={100} w={260} h={44} label="CHATWOOT" sub="SIGNED WEBHOOK" fs={11} fsSub={8} />

          <Box x={30} y={184} w={280} h={60} label="LLM ASSISTANT" sub="AGENTIC TOOL LOOP" accent fs={11} fsSub={8} />
          <rect className="sch-led" x={296} y={190} width={6} height={6} fill={SIGNAL} />

          <Box x={20} y={290} w={86} h={38} label="APPOINTMENTS" fs={8} />
          <Box x={118} y={290} w={86} h={38} label="PATIENTS" fs={8} />
          <Box x={216} y={290} w={86} h={38} label="BILLING" fs={8} />

          <Box
            x={20}
            y={382}
            w={300}
            h={54}
            label="POSTGRESQL 16 — RLS"
            sub="95 MODELS · 115 MIGRATIONS · TENANT ISOLATION"
            fs={11}
            fsSub={8}
          />

          <text x={20} y={458} fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.2" fill={FAINT}>
            3-PHASE TX — MODEL LOOP
          </text>
          <text x={20} y={470} fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.2" fill={FAINT}>
            NEVER HOLDS A CONNECTION
          </text>
        </>
      ) : (
        <>
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
        </>
      )}
    </svg>
  );
}
