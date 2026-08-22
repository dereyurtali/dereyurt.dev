import type { Metadata } from 'next';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import SiteHeader, { HOME_NAV } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'CV — Ali Dereyurt',
  description:
    'CV of Ali Dereyurt — computer engineer working on satellite and ground systems, embedded software, control and additive manufacturing.',
};

const EXPERIENCE = [
  {
    role: 'Embedded Software Engineer Intern — R&D',
    org: 'ASPİLSAN Enerji A.Ş.',
    date: 'FEB 2026 — MAR 2026',
    lines: [
      'HEDAP: an in-house CAN analysis platform for defence-grade battery management systems, built with Qt6 / C++17.',
      'Vector DBC parsing with Intel and Motorola bit layouts; UART, SLCAN and PCAN-USB links; four synchronised live charts on a 50 ms batched repaint; CSV replay mode.',
      'Delivered for internal R&D use.',
    ],
  },
  {
    role: 'Software Developer — Contract, Remote',
    org: 'Turkeye Clinic — International Eye Hospital',
    date: 'OCT 2025 — APR 2026',
    lines: [
      'AirMed HBYS: multi-tenant hospital information system (NestJS · tRPC · Prisma · PostgreSQL 16 RLS · React) with an LLM patient assistant booking real appointments over WhatsApp, Telegram and Instagram.',
      'Earlier phase: end-to-end automation architecture — an LLM conversation agent with intent classification, n8n workflows wiring the CRM, Google Workspace and the clinic\'s EHR over REST, OAuth 2.0 and webhooks, and a computer-vision document pipeline. 90%+ reduction in manual workload.',
    ],
  },
  {
    role: 'Additive Manufacturing Engineer Candidate',
    org: '3DOIT Additive Manufacturing',
    date: 'AUG 2024 — FEB 2025',
    lines: [
      'FDM production management for aerospace and industrial prototyping: printer-farm operation, parameter optimisation and DfM processes.',
      'Dimensional verification and surface inspection of printed parts.',
    ],
  },
  {
    role: 'R&D Intern — Ground Systems Software',
    org: 'TÜRKSAT Uydu Haberleşme A.Ş. — Satellite R&D Directorate',
    date: 'JUN 2022 — AUG 2022',
    lines: [
      'Real-time telemetry ground-station software for a tethered aerostat system, built in Java Swing: altitude, position, environmental data and system health on one operator screen.',
      'JDBC / MySQL data logging; integration work with the hardware and systems teams.',
    ],
  },
  {
    role: 'Technical Instructor — Aviation Technologies & IoT',
    org: 'Turkish Technology Team Foundation (T3)',
    date: '2021 — 2022',
    lines: [
      'Taught aviation technologies, satellite systems, rocket propulsion, IoT, Python and Raspberry Pi; mentored student competition teams.',
    ],
  },
  {
    role: 'Part-time Student — Metal & Polymer AM',
    org: 'FSMVÜ ALUTEAM',
    date: 'OCT 2021 — FEB 2022',
    lines: [
      'EOS SLS and DMLS systems: build preparation, powder handling, depowdering and surface finishing.',
      '3D scanning and part inspection on a Hexagon robotic arm.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'IAC 2026',
    desc: 'Real-Time Active Vibration Compensation in Microgravity Additive Manufacturing via Kinematic Speed Modulation — accepted as an Interactive Presentation at the 77th International Astronautical Congress. Firmware-level speed modulation instead of an added counter-actuator.',
    href: '/research',
    internal: true,
  },
  {
    name: 'TALIA Aerospace',
    desc: 'TÜRKSAT Model Satellite Competition — founder and team lead of a 30+ member team. System architecture, mission profile, integration, ground station and PID active landing. Four consecutive national finals; 39/39 requirements met in 2022.',
    href: '/turksat-muy-2022',
    internal: true,
  },
  {
    name: 'Single-Axis Shaker Rig',
    desc: 'Open-hardware test rig that physically reproduces the ISS-like acceleration profile: mechanics, electronics, Arduino firmware and Python/Tk desktop software. 1 kHz set-point update, ±150 mm stroke, ~10 kg load class, under 200 USD.',
    href: 'https://github.com/dereyurtali/single-axis-shaker-rig',
  },
  {
    name: 'Printimize',
    desc: 'Graduation project and the product side of the optimisation paper: vision-model geometry analysis with forced tool-use, monotonicity-constrained gradient boosting (R² = 0.989 ± 0.007) and Bayesian search validated through the slicer.',
    href: '/parameter',
    internal: true,
  },
  {
    name: 'AirMed HBYS',
    desc: 'Production hospital information system with an agentic LLM assistant — 95 database models, 115 hand-reviewed migrations, row-level-security multi-tenancy.',
    href: 'https://github.com/dereyurtali/airmed-hbys-showcase',
  },
  {
    name: 'UX Principles Skill',
    desc: 'Open-source Claude Code skill distilling seven design books into review heuristics — used by other developers.',
    href: 'https://github.com/dereyurtali/ux-principles-skill',
  },
];

const PUBLICATIONS = [
  {
    title:
      'Effects of process parameters on surface roughness in fused deposition modelling after cusp filtering',
    desc: 'Ali Dereyurt · Ebubekir Koç — in preparation. Full factorial design over layer height, wall count, infill density and print speed; 324 profiles from 108 specimens to ISO 4287/4288; a cusp filtering method locked to measured peak and valley positions. Speed significant at p = 0.005 after filtering.',
  },
  {
    title:
      'Multi-objective parameter optimisation in fused deposition modelling using machine learning and Bayesian optimisation',
    desc: 'Ali Dereyurt · Ebubekir Koç — in preparation. Four orthographic views read by a vision-language model, monotonicity-constrained gradient boosting (LOOCV R² = 0.991, RMSE 0.569 µm), Bayesian search with slicer validation; full cycle ≈ 270 s.',
  },
];

const SKILLS: [string, string][] = [
  ['Software', 'C++17 · Python · Java · Qt6 · CMake · TypeScript · React / Next.js'],
  ['Embedded', 'AVR / Arduino · STM32 · CAN bus · Vector DBC · UART · I²C · SPI · GPIO · SLCAN / PCAN-USB'],
  ['Systems', 'Telemetry and ground stations · integration and test · PDR / CDR documentation · mass and power budgets'],
  ['Control', 'PID · FxLMS · vibration measurement and test rigs'],
  ['ML / Data', 'scikit-learn · Bayesian optimisation · gradient boosting · YOLO · computer vision'],
  ['Tools', 'Git / GitHub · Linux · Docker · Fusion 360'],
  ['Manufacturing', 'FDM · SLS · DMLS · DfM · Klipper · surface and dimensional metrology'],
];

const LEADERSHIP = [
  'TALIA Aerospace — founder and lead of a 30+ member engineering team through the TÜRKSAT Model Satellite competition, four consecutive national finals (2018 — 2022)',
  'NASA CanSat — mechanical subsystem lead: closed-loop camera counter-rotation during descent (2020 — 2021)',
  'T3 Foundation — technical instructor and mentor for student teams in aviation technologies and IoT',
];

export default function CvPage() {
  return (
    <div>
      {/* ---------- Header (screen only) ---------- */}
      <SiteHeader items={HOME_NAV} />

      <main className="mx-auto max-w-[860px] px-5 pb-24 pt-28 sm:px-8">
        {/* ---------- Head ---------- */}
        <div className="cv-head cv-block flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="label label-signal">CURRICULUM VITAE</p>
            <h1 className="cv-name display mt-3 text-5xl leading-none sm:text-6xl">Ali Dereyurt</h1>
            <p className="mt-2 text-ink-dim">Computer Engineer — Istanbul, Türkiye</p>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <a href="mailto:ali@dereyurt.dev" className="label label-link transition-colors hover:text-signal">
              ALI@DEREYURT.DEV
            </a>
            <a href="https://github.com/dereyurtali" className="label label-link transition-colors hover:text-signal">
              GITHUB.COM/DEREYURTALI
            </a>
            <a href="https://www.linkedin.com/in/alidereyurt/" className="label label-link transition-colors hover:text-signal">
              LINKEDIN.COM/IN/ALIDEREYURT
            </a>
            <a
              href="/docs/Ali-Dereyurt-CV.pdf"
              download
              className="label label-link transition-colors hover:text-signal"
            >
              DOWNLOAD CV (PDF) ↓
            </a>
            <a
              href="/docs/Ali-Dereyurt-Portfolio.pdf"
              download
              className="label label-link transition-colors hover:text-signal"
            >
              DOWNLOAD PORTFOLIO (PDF) ↓
            </a>
            <PrintButton />
          </div>
        </div>

        <p className="cv-block mt-8 max-w-[68ch] leading-relaxed text-ink-dim">
          Computer engineer working across satellite and ground systems, embedded software, control
          and additive manufacturing. Team lead at the TÜRKSAT Model Satellite competition for four
          years, ground systems software at TÜRKSAT, embedded software for battery management at
          ASPİLSAN, and research on additive manufacturing in microgravity accepted to IAC 2026.
          Comfortable where hardware, firmware and real-time software have to agree with each other.
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
              {'internal' in p && p.internal ? (
                <Link
                  href={p.href}
                  className="label-link display text-xl transition-colors hover:text-signal sm:col-span-3"
                >
                  {p.name}
                </Link>
              ) : (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-link display text-xl transition-colors hover:text-signal sm:col-span-3"
                >
                  {p.name}
                </a>
              )}
              <p className="text-sm leading-relaxed text-ink-dim sm:col-span-9">{p.desc}</p>
            </div>
          ))}
        </section>

        {/* ---------- Publications ---------- */}
        <section className="cv-section mt-14">
          <div className="title-block mb-2">
            <span className="label label-signal">03</span>
            <span className="label">PUBLICATIONS — IN PREPARATION</span>
          </div>
          {PUBLICATIONS.map((p) => (
            <div key={p.title} className="cv-entry border-b border-line py-5">
              <h2 className="text-base leading-snug text-ink">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.desc}</p>
            </div>
          ))}
        </section>

        {/* ---------- Skills ---------- */}
        <section className="cv-section mt-14">
          <div className="title-block mb-2">
            <span className="label label-signal">04</span>
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
              <span className="label label-signal">05</span>
              <span className="label">EDUCATION</span>
            </div>
            <h2 className="display text-xl">B.Sc. Computer Engineering</h2>
            <p className="mt-1 text-sm text-ink-faint">Fatih Sultan Mehmet Vakıf University</p>
            <p className="label mt-2">2018 — 2026 · ISTANBUL</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">
              Graduation project: Machine Learning Based Surface Roughness Prediction and Parameter
              Suggestion.
            </p>
            <p className="label mt-3">LANGUAGE: ENGLISH · C1</p>
          </div>
          <div className="cv-block">
            <div className="title-block mb-5">
              <span className="label label-signal">06</span>
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
          <Link href="/" className="label label-link underline-offset-4 transition-colors hover:text-ink hover:underline">
            ← BACK TO SITE
          </Link>
        </div>
      </main>
    </div>
  );
}
