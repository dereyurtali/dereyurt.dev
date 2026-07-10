import type { Metadata } from 'next';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'CV — Ali Dereyurt',
  description: 'CV of Ali Dereyurt — AI developer building production systems with LLM agents.',
};

const EXPERIENCE = [
  {
    role: 'Software Developer — Contract, Remote',
    org: 'Turkeye Clinic — International Eye Hospital',
    date: 'OCT 2025 — APR 2026',
    lines: [
      'AirMed HBYS: multi-tenant hospital information system (NestJS · tRPC · Prisma · PostgreSQL 16 RLS · React) with an LLM patient assistant booking real appointments over WhatsApp, Telegram and Instagram.',
      'AI-orchestrated development end to end: issue → isolated AI session → two-lane CI on self-hosted runners → staging → rehearsed production deploys with auto-rollback.',
      'Earlier phase: end-to-end AI automation architecture — LLM conversation agent with intent classification and cross-session context, n8n workflows wiring the CRM, Google Workspace and the clinic\'s EHR over REST, OAuth 2.0 and webhooks; a computer-vision document pipeline. 90%+ reduction in manual workload, 24/7 automated patient support.',
    ],
  },
  {
    role: 'Embedded Software Engineer Intern',
    org: 'ASPİLSAN Enerji — R&D',
    date: 'FEB 2026 — MAR 2026',
    lines: [
      'HEDAP: Qt6/C++17 cross-platform CAN bus analysis platform (DBC decode, UART/SLCAN/PCAN live telemetry, real-time charts) — delivered as an internal R&D tool, developed AI-orchestrated with Claude Code.',
    ],
  },
  {
    role: 'Additive Manufacturing Engineer',
    org: '3DOIT Additive Manufacturing',
    date: 'AUG 2024 — FEB 2025',
    lines: [
      'FDM production for aerospace and industrial prototyping: printer-farm operation, slicing and parameter optimization, DfM collaboration, quality control.',
    ],
  },
  {
    role: 'R&D Intern — Ground Systems Software',
    org: 'TÜRKSAT Satellite Communications',
    date: 'JUN 2022 — AUG 2022',
    lines: [
      'Ground-station desktop software for a tethered aerostat system: real-time telemetry monitoring UI (Java Swing) with MySQL logging.',
    ],
  },
  {
    role: 'Technical Instructor — Aviation Technologies & IoT',
    org: 'Turkish Technology Team Foundation (T3)',
    date: 'SEP 2021 — JUN 2022',
    lines: ['Taught UAV/satellite systems and Python/IoT; mentored TEKNOFEST student teams.'],
  },
];

const PROJECTS = [
  {
    name: 'AirMed HBYS',
    desc: 'Production HIS with an agentic LLM assistant — 95 database models, 115 hand-reviewed migrations, row-level-security multi-tenancy.',
    href: 'https://github.com/dereyurtali/airmed-hbys-showcase',
  },
  {
    name: 'Printimize',
    desc: 'AI 3D-print parameter optimization — Claude vision with forced tool-use, Bayesian optimization, R² = 0.99 surface-roughness model. Graduation project.',
    href: 'https://github.com/dereyurtali/printimize-showcase',
  },
  {
    name: 'UX Principles Skill',
    desc: 'Open-source Claude Code skill distilling seven design books into review heuristics — used by other developers.',
    href: 'https://github.com/dereyurtali/ux-principles-skill',
  },
  {
    name: 'AirMed Monitor',
    desc: 'Real-time ops panel for the AirMed dev pipeline — runners, CI queues, deploys.',
    href: 'https://github.com/dereyurtali/airmed-monitor',
  },
];

const SKILLS: [string, string][] = [
  ['AI / LLM', 'Agentic tool-use · Claude and OpenRouter APIs · prompt and knowledge-base architecture · guardrails · n8n · computer vision · scikit-learn · Bayesian optimization'],
  ['Backend', 'TypeScript · NestJS · tRPC · Prisma · Zod · Node.js · FastAPI · Python · PostgreSQL (RLS, partitioning) · Redis'],
  ['Frontend', 'React · Next.js · Vite · Tailwind · shadcn/ui · Three.js · GSAP'],
  ['DevOps', 'GitHub Actions (self-hosted runners) · Docker · Tailscale · CI/CD design · gitleaks · semgrep'],
  ['Embedded', 'C · C++17 · Qt6 · CAN bus / DBC · UART · Java'],
];

const LEADERSHIP = [
  'TALIA Aerospace — led a 30+ member engineering team to the TÜRKSAT Model Satellite national finals, four consecutive years',
  'NASA CanSat — mechanical subsystem lead · ROKETSAN / TÜBİTAK rocket competition — payload structures',
];

export default function CvPage() {
  return (
    <div>
      {/* ---------- Header (screen only) ---------- */}
      <header className="fixed top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="label label-signal">
            ALI DEREYURT
          </Link>
          <nav className="flex items-center gap-6 sm:gap-10">
            <Link href="/#work" className="label transition-colors hover:text-ink">
              WORK
            </Link>
            <Link href="/airmed" className="label transition-colors hover:text-ink">
              HOW I BUILD
            </Link>
            <Link href="/#contact" className="label transition-colors hover:text-ink">
              CONTACT
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-5 pb-24 pt-28 sm:px-8">
        {/* ---------- Head ---------- */}
        <div className="cv-head cv-block flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="label label-signal">CURRICULUM VITAE</p>
            <h1 className="cv-name display mt-3 text-5xl leading-none sm:text-6xl">Ali Dereyurt</h1>
            <p className="mt-2 text-ink-dim">AI Developer — Istanbul, Türkiye</p>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <a href="mailto:ali@dereyurt.dev" className="label transition-colors hover:text-signal">
              ALI@DEREYURT.DEV
            </a>
            <a href="https://github.com/dereyurtali" className="label transition-colors hover:text-signal">
              GITHUB.COM/DEREYURTALI
            </a>
            <a href="https://www.linkedin.com/in/alidereyurt/" className="label transition-colors hover:text-signal">
              LINKEDIN.COM/IN/ALIDEREYURT
            </a>
            <PrintButton />
          </div>
        </div>

        <p className="cv-block mt-8 max-w-[68ch] leading-relaxed text-ink-dim">
          Computer engineer focused on production AI systems: agentic LLM integrations with real
          guardrails, and the CI/CD pipelines that let AI agents ship features safely. Also at home
          in embedded software (C++/Qt6) and additive manufacturing.
        </p>

        {/* ---------- Experience ---------- */}
        <section className="cv-section mt-14">
          <div className="title-block mb-2">
            <span className="label label-signal">01</span>
            <span className="label">EXPERIENCE</span>
          </div>
          {EXPERIENCE.map((e) => (
            <div key={e.org} className="cv-entry grid gap-2 border-b border-line py-6 sm:grid-cols-12">
              <p className="label pt-1 sm:col-span-3">{e.date}</p>
              <div className="sm:col-span-9">
                <h2 className="display text-2xl leading-tight">{e.role}</h2>
                <p className="mt-1 text-sm text-ink-faint">{e.org}</p>
                <ul className="mt-3 space-y-1.5">
                  {e.lines.map((l) => (
                    <li key={l} className="text-sm leading-relaxed text-ink-dim">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* ---------- Projects ---------- */}
        <section className="cv-section mt-14">
          <div className="title-block mb-2">
            <span className="label label-signal">02</span>
            <span className="label">SELECTED PROJECTS</span>
          </div>
          {PROJECTS.map((p) => (
            <div key={p.name} className="cv-entry grid gap-2 border-b border-line py-5 sm:grid-cols-12">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="display text-xl transition-colors hover:text-signal sm:col-span-3"
              >
                {p.name}
              </a>
              <p className="text-sm leading-relaxed text-ink-dim sm:col-span-9">{p.desc}</p>
            </div>
          ))}
        </section>

        {/* ---------- Skills ---------- */}
        <section className="cv-section mt-14">
          <div className="title-block mb-2">
            <span className="label label-signal">03</span>
            <span className="label">SKILLS</span>
          </div>
          {SKILLS.map(([group, list]) => (
            <div key={group} className="cv-entry grid gap-2 border-b border-line py-4 sm:grid-cols-12">
              <p className="label pt-0.5 sm:col-span-3">{group}</p>
              <p className="text-sm leading-relaxed text-ink-dim sm:col-span-9">{list}</p>
            </div>
          ))}
        </section>

        {/* ---------- Education + Leadership ---------- */}
        <section className="cv-section mt-14 grid gap-12 sm:grid-cols-2">
          <div className="cv-block">
            <div className="title-block mb-5">
              <span className="label label-signal">04</span>
              <span className="label">EDUCATION</span>
            </div>
            <h2 className="display text-xl">B.Sc. Computer Engineering</h2>
            <p className="mt-1 text-sm text-ink-faint">Fatih Sultan Mehmet Vakıf University</p>
            <p className="label mt-2">2018 — 2026 · ISTANBUL</p>
          </div>
          <div className="cv-block">
            <div className="title-block mb-5">
              <span className="label label-signal">05</span>
              <span className="label">LEADERSHIP</span>
            </div>
            <ul className="space-y-2">
              {LEADERSHIP.map((l) => (
                <li key={l} className="text-sm leading-relaxed text-ink-dim">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-16 print:hidden">
          <Link href="/" className="label underline-offset-4 transition-colors hover:text-ink hover:underline">
            ← BACK TO SITE
          </Link>
        </div>
      </main>
    </div>
  );
}
