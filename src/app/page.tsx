'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, splitLines, EASE_OUT } from '@/lib/animation';
import AirmedSchematic from '@/components/AirmedSchematic';
import AgentLoop from '@/components/AgentLoop';
import StudioSpine from '@/components/StudioSpine';
import WatchCta from '@/components/WatchCta';
import AmbientVideo from '@/components/AmbientVideo';
import OrbField from '@/components/OrbField';
import SiteHeader, { HOME_NAV } from '@/components/SiteHeader';
import ClinicFlows from '@/components/ClinicFlows';

gsap.registerPlugin(useGSAP);

const CAPABILITIES =
  'C++17 · QT6 · CAN / DBC · STM32 · AVR · TELEMETRY & GROUND STATIONS · PID / FxLMS · PYTHON · MACHINE LEARNING · FDM / SLS / DMLS';

/* ---------- 01 · satellite and ground systems ---------- */

const TALIA_STATS: [string, string][] = [
  ['30+', 'ENGINEERS LED'],
  ['4', 'CONSECUTIVE NATIONAL FINALS'],
  ['5', 'PAYLOAD LAYERS'],
  ['39/39', 'REQUIREMENTS MET · 2022'],
];

const EARLIER = [
  {
    index: '07.1',
    title: 'Model Satellite 2021',
    subtitle: 'Team lead · autogyro descent · 199-page CDR',
    description:
      'A rocket-deployed model satellite that slows its own fall: parachute to 400 m, then an autogyro rotor, a ten-second PID altitude hold at 200 m and a pyrotechnic smoke marker.',
    href: '/turksat-muy-2021',
  },
  {
    index: '07.2',
    title: 'CanSat Spin Stabilization',
    subtitle: 'NASA CanSat · mechanical subsystem lead',
    description:
      'Instead of de-rotating the camera image after the fact, a closed-loop mechanism counter-rotates the camera platform during descent. The call was made on processing load and system mass together.',
    href: '/cansat-stabilization',
  },
];

/* ---------- 02 · research and instrumentation ---------- */

const RIG_STATS: [string, string][] = [
  ['1 kHz', 'POSITION SET-POINT UPDATE'],
  ['±150 mm', 'USABLE STROKE'],
  ['~10 kg', 'TARGET LOAD CLASS'],
  ['<200 USD', 'BUILD COST, EXCL. PRINTER & PC'],
];

const PAPERS = [
  {
    title:
      'Effects of process parameters on surface roughness in fused deposition modelling after cusp filtering',
    authors: 'Ali Dereyurt · Ebubekir Koç — in preparation',
    description:
      'Layer height, wall count, infill density and print speed in a full factorial design: 324 surface profiles from 108 specimens, measured to ISO 4287/4288. To separate the dominant effect of layer geometry I developed a cusp filter locked to the measured peak and valley positions — after filtering, speed becomes significant at p = 0.005.',
  },
  {
    title:
      'Multi-objective parameter optimisation in fused deposition modelling using machine learning and Bayesian optimisation',
    authors: 'Ali Dereyurt · Ebubekir Koç — in preparation',
    description:
      'End-to-end approach that reads an uploaded 3D model through four orthographic views and a vision-language model, predicts roughness with monotonicity-constrained gradient boosting (5-fold CV R² = 0.989 ± 0.007, LOOCV R² = 0.991, RMSE 0.569 µm) and balances roughness, material use, print time and strength through Bayesian search with slicer validation. Full cycle ≈ 270 s.',
  },
];

const PRODUCTION = [
  [
    '3DOIT ADDITIVE MANUFACTURING',
    'ENGINEER CANDIDATE · AUG 2024 — FEB 2025',
    'FDM production for aerospace and industrial prototyping: printer-farm operation, parameter optimisation, DfM, dimensional verification and surface inspection.',
  ],
  [
    'FSMVÜ ALUTEAM',
    'PART-TIME · OCT 2021 — FEB 2022',
    'EOS SLS and DMLS systems: build preparation, powder handling, depowdering and surface finishing; 3D scanning and part inspection on a Hexagon robotic arm.',
  ],
];

/* ---------- 04 · software systems ---------- */

const WORK = [
  {
    index: '08.2',
    title: 'Clinic AI Automation',
    subtitle: 'n8n-orchestrated operations for an eye hospital',
    description:
      'LLM conversation agent with intent classification + n8n workflows wiring the CRM, Google Workspace and the clinic\'s EHR over REST, OAuth 2.0 and webhooks, plus a computer-vision document pipeline. 90%+ less manual work, 24/7 patient support.',
    links: [],
  },
  {
    index: '08.3',
    title: 'Printimize',
    subtitle: 'The optimisation study, shipped as a product',
    description:
      'The web application behind the multi-objective optimisation paper: vision-model geometry analysis with forced tool-use, a physics-constrained roughness model trained on real profilometer readings, and Bayesian search validated through the slicer.',
    links: [
      { label: 'Case study', href: '/parameter', internal: true },
      { label: 'Live', href: 'https://parameterapp.dereyurt.dev' },
      { label: 'GitHub', href: 'https://github.com/dereyurtali/printimize-showcase' },
    ],
  },
  {
    index: '08.4',
    title: 'UX Principles Skill',
    subtitle: 'A Claude Code skill used by other developers',
    description:
      'Seven classic design books distilled into rules and review heuristics Claude applies while building UIs. Open source.',
    links: [{ label: 'GitHub', href: 'https://github.com/dereyurtali/ux-principles-skill' }],
  },
  {
    index: '08.5',
    title: 'AirMed Monitor',
    subtitle: 'Live ops panel for my dev pipeline',
    description:
      'Real-time instrument panel I use daily while building AirMed — runner queues, CI jobs and staging deploys on one screen.',
    links: [
      { label: 'Live', href: 'https://dereyurtali.github.io/airmed-monitor/' },
      { label: 'GitHub', href: 'https://github.com/dereyurtali/airmed-monitor' },
    ],
  },
  {
    index: '08.6',
    title: 'Vonguard',
    subtitle: 'Bilingual site + warranty verification',
    description:
      'TR/EN marketing site with a Supabase-backed warranty verification flow. Next.js 16, Tailwind v4.',
    links: [
      { label: 'Live', href: 'https://vonguard-website.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/dereyurtali/vonguard-website' },
    ],
  },
];

const STUDIO_CAPABILITIES = [
  ['AI & AUTOMATION', 'LLM-integrated products, agents and workflow automation that replace manual steps.'],
  ['SAAS PLATFORMS', 'Multi-tenant architectures built for growth, isolation and reliability.'],
  ['HEALTHCARE SYSTEMS', 'KVKK / GDPR-ready clinical software, EHR integration, real clinic workflows.'],
  ['CLOUD & INFRASTRUCTURE', 'On-prem or EU-hosted deploys, observability, encrypted off-site backups.'],
];

// IBM Plex Mono has no ⇄ (U+21C4) — it falls back to another face and breaks the
// line. Everything here stays inside the font's own glyph set.
const STUDIO_SPECS = [
  ['REGISTERED', 'EU · GREECE'],
  ['OPERATING', 'ISTANBUL · ATHENS'],
  ['SHIPS THROUGH IT', 'AIRMED · VONGUARD'],
  ['COMPLIANCE', 'KVKK / GDPR-ALIGNED'],
];

const PROCESS = [
  ['PARALLEL SESSIONS', 'One issue = one branch = one worktree = one AI session. Hooks block edits in the main clone.'],
  ['TWO-LANE CI', 'Fast blocking gate in minutes on self-hosted runners; heavy e2e suite in stage groups.'],
  ['AUTO STAGING', 'Every merge deploys to a staging box on a private Tailscale mesh.'],
  ['SAFE PRODUCTION', 'Backups → migration rehearsal on a copy → deploy → health check → auto-rollback.'],
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const ctx = root.current!;

      // ScrollTrigger'lar GSAP context'i içinde doğsun; aksi halde rota değişiminde
      // temizlenmeyip eski ölçülerle sayfada kalıyorlar.
      const build = contextSafe!(() => {
        // A hash navigation ("/#work") can run this twice on the SAME nodes,
        // ~20ms apart. The second pass's gsap.from() then captures the
        // first pass's hidden from-state as its END state — every reveal
        // completes to invisible and the page looks empty until a reload.
        // Flag the DOM itself: one build per mounted tree, ever.
        if (ctx.dataset.gsapBuilt) return;
        ctx.dataset.gsapBuilt = '1';
        // ---------- Hero: kâğıt önce belirir, sonra ad oturur, sonra panel açılır ----------
        gsap.from('.hero-orbs-wrap', { autoAlpha: 0, duration: 1.8, ease: 'power2.out', delay: 0.3 });

        const heroTitle = ctx.querySelector('.hero-title')!;
        const split = splitLines(heroTitle);
        gsap.set(heroTitle, { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
        tl.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.08,
          delay: 0.15,
        })
          .from('.hero-meta', { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.08 }, '-=0.9')
          .from('.hero-role', { autoAlpha: 0, y: 16, duration: 0.9 }, '-=0.8')
          // panel çerçevesi önce açılır, içindeki iz kendi zamanlamasıyla yazmaya başlar
          .from('.hero-panel', { autoAlpha: 0, y: 24, duration: 1, ease: 'power3.out' }, '-=0.7')
          .from('.hero-strip', { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power3.inOut' }, '-=0.8')
          .from('.hero-caps', { autoAlpha: 0, duration: 0.8 }, '-=0.5');

        // ---------- Scroll reveals ----------
        ctx.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 36,
            duration: 1,
            ease: EASE_OUT,
            scrollTrigger: { trigger: el, start: 'top 94%' },
          });
        });

        ctx.querySelectorAll<HTMLElement>('[data-rule]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          });
        });

        ctx.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
          const s = splitLines(el);
          gsap.set(el, { autoAlpha: 1 });
          gsap.from(s.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
            ease: EASE_OUT,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });

        // Work rows: staggered entrance. Two lists live on the page now (space
        // work and software work), so each one triggers on itself — a single
        // selector would fire every row off the first list and the second set
        // would finish its reveal far above the fold.
        ctx.querySelectorAll<HTMLElement>('.work-list').forEach((list) => {
          gsap.from(list.querySelectorAll('.work-row'), {
            autoAlpha: 0,
            y: 44,
            duration: 0.9,
            stagger: 0.12,
            ease: EASE_OUT,
            scrollTrigger: { trigger: list, start: 'top 85%' },
          });
        });

        ScrollTrigger.refresh();
      });

      if (document.fonts.status === 'loaded') build();
      else document.fonts.ready.then(() => root.current && build());

      // The router can keep this DOM alive across a leave-and-return while the
      // GSAP context (and every style it set) is reverted — so the built-flag
      // must die with the context, or the returning visit never rebuilds and
      // `.invisible` elements stay invisible.
      return () => {
        delete ctx.dataset.gsapBuilt;
      };
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <a
        href="#work"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2"
      >
        SKIP TO CONTENT
      </a>

      {/* ---------- Header ---------- */}
      <SiteHeader items={HOME_NAV} />

      <main>
        {/* ---------- Hero: the name, and beside it the work, running ----------
            No slogan. A reviewer is told nothing and shown one thing instead: a CAN
            frame being decoded against a DBC, and a telemetry packet coming down a
            1 Hz link, live, on loop. */}
        <section className="hero-pin grid-paper relative flex min-h-svh flex-col overflow-hidden border-b border-line px-5 pb-8 pt-20 sm:px-8 sm:pt-24">
          {/* Drifting theme-coloured circles on the graph paper — translucent ink
              keeps them under the type; they gather gently around a slow cursor
              (see OrbField for the behaviour). No blend mode: the rgba fills
              already let the grid through, and multiply cost a compositing pass
              on every frame of an always-animating canvas. */}
          <div className="hero-orbs-wrap pointer-events-none absolute inset-0" aria-hidden>
            <OrbField className="h-full w-full" />
          </div>

          {/* DOM order is name → panel → role, which on a phone puts the proof
              inside the first screen; on lg the grid pulls the panel to the right
              column and the role back under the name. */}
          <div className="flex flex-1 items-center">
            <div className="hero-copy relative mx-auto w-full max-w-[1440px]">
              <div className="mb-8 flex items-center justify-between">
                <p className="hero-meta label">COMPUTER ENGINEER — ISTANBUL, TR</p>
                <p className="hero-meta label hidden items-center gap-2 sm:flex">
                  <span className="inline-block h-2 w-2 animate-pulse bg-green" />
                  OPEN TO WORK
                </p>
              </div>

              <div className="grid gap-7 lg:grid-cols-12 lg:gap-12">
                <h1 className="hero-title display display-xl invisible min-w-0 text-[16vw] leading-[0.84] sm:text-[13vw] lg:col-span-6 lg:text-[7.4vw]">
                  Ali
                  <br />
                  Dereyurt
                </h1>

                <div className="hero-panel min-w-0 lg:col-span-6 lg:row-span-2 lg:self-center">
                  <AgentLoop />
                </div>

                <p className="hero-role max-w-md text-[15px] leading-relaxed text-ink-dim sm:text-base lg:col-span-6">
                  I work on <span className="text-ink">satellite and ground systems</span>, embedded
                  software and control — telemetry that has to arrive, buses that have to decode,
                  and the software that has to stay honest about both.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[1440px]">
            <div className="hero-strip dim mb-4" />
            <p className="hero-caps label">{CAPABILITIES}</p>
          </div>
        </section>

        {/* ---------- 01 · TÜRKSAT Model Satellite ---------- */}
        <section id="work" className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">01</span>
              <span className="label">SATELLITE SYSTEMS</span>
              <span className="label ml-auto hidden sm:block">2018 — 2022</span>
            </div>

            <div className="featured-panel relative overflow-hidden border border-line bg-card">
              <div className="grid lg:grid-cols-12">
                {/* text side — clean paper, fully readable */}
                <div className="min-w-0 p-6 sm:p-10 lg:col-span-7 lg:p-14">
                  <p className="label mb-5" data-reveal>
                    FOUNDER &amp; TEAM LEAD — TALIA AEROSPACE
                  </p>
                  <h2 className="display display-xl invisible text-6xl leading-[0.95] sm:text-8xl" data-split>
                    TÜRKSAT <span className="text-signal">Model Satellite</span>
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim" data-reveal>
                    Four years leading the same team through Türkiye&apos;s model satellite
                    competition. I owned the system architecture, the mission profile, the
                    integration plan, the ground station and the actively controlled landing —
                    and in 2022 the design met all 39 requirements and reached the national final
                    again.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
                    {['System Architecture', 'PID Active Landing', 'Telemetry & Command', 'C# WPF Ground Station', 'YOLOv4 Detection'].map(
                      (t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      )
                    )}
                  </div>
                  <ul className="mt-10 space-y-3 border-l-2 border-signal pl-5" data-reveal>
                    {[
                      'System architecture and payload decomposition across five modular layers',
                      'Separation mechanism, mechanical revisions and FDM-produced flight parts',
                      'Mass and power budgets, material selection, integration planning',
                      'Ground station: map, 3D attitude, live video and on-screen object detection',
                    ].map((line) => (
                      <li key={line} className="text-sm leading-relaxed text-ink-dim">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
                    <Link
                      href="/turksat-muy-2022"
                      className="label-link group gap-3 font-mono text-xs tracking-[0.14em] text-signal"
                    >
                      READ THE 2022 CRITICAL DESIGN REVIEW
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                      href="/turksat-muy-2021"
                      className="label label-link underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      2021 CDR →
                    </Link>
                  </div>
                </div>

                {/* numbers side — the mission record, on graph paper */}
                <div className="grid-paper relative grid min-w-0 grid-cols-2 border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
                  {TALIA_STATS.map(([value, label], i) => (
                    <div
                      key={label}
                      className={`flex min-h-[130px] flex-col justify-center p-5 sm:min-h-[170px] sm:p-8 ${
                        i % 2 === 0 ? 'border-r border-line' : ''
                      } ${i < 2 ? 'border-b border-line' : ''}`}
                      data-reveal
                    >
                      <p className="display text-4xl leading-none text-signal sm:text-5xl">{value}</p>
                      <p className="label mt-3 leading-relaxed">{label}</p>
                    </div>
                  ))}
                  <p className="label absolute bottom-3 left-4 bg-paper/85 px-2 py-1">
                    TALIA AEROSPACE — MISSION RECORD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 02 · TÜRKSAT ground systems ---------- */}
        <section
          id="ground"
          className="scroll-mt-16 border-y border-line bg-paper-2 px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">02</span>
              <span className="label">GROUND SYSTEMS SOFTWARE</span>
              <span className="label ml-auto hidden sm:block">TÜRKSAT UYDU HABERLEŞME · 2022</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="min-w-0 lg:col-span-7">
                <h2 className="display display-xl invisible text-5xl leading-[0.95] sm:text-7xl" data-split>
                  A screen the <span className="text-signal">operator</span> can fly a balloon from
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim" data-reveal>
                  R&amp;D internship in TÜRKSAT&apos;s Satellite R&amp;D Directorate, on the
                  ground-station desktop software for a tethered aerostat system. The job was to
                  watch the data coming down during flight, record it, and put it in front of the
                  operations side in an order they could actually work from.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
                  {['Java Swing', 'Real-time telemetry', 'JDBC / MySQL', 'Systems integration'].map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="mt-8 space-y-3 border-l-2 border-signal pl-5" data-reveal>
                  {[
                    'Telemetry interface in Java Swing — altitude, position, environmental data and system health on one screen',
                    'Data logging through JDBC / MySQL, so a flight can be read back afterwards',
                    'Integration work with the hardware and systems teams',
                    'Operator-screen logic and user flow, not just a data dump',
                  ].map((line) => (
                    <li key={line} className="text-sm leading-relaxed text-ink-dim">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 lg:col-span-5" data-reveal>
                <div className="dim mb-5" />
                <dl>
                  {[
                    ['ROLE', 'R&D INTERN'],
                    ['UNIT', 'SATELLITE R&D DIRECTORATE'],
                    ['PERIOD', 'JUN — AUG 2022'],
                    ['SYSTEM', 'TETHERED AEROSTAT'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
                      <dt className="label">{k}</dt>
                      <dd className="label text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="card mt-8 p-6">
                  <p className="label label-signal mb-3">WHAT IT LEFT ME WITH</p>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    Working against a live data stream, and seeing at close range how ground-system
                    software has to sit between the operations side and the hardware side —
                    the same seam the model satellite ground station sits on, this time inside a
                    real satellite organisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 03 · IAC 2026 ---------- */}
        <section id="research" className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">03</span>
              <span className="label">RESEARCH — ACCEPTED TO IAC 2026</span>
              <span className="label ml-auto hidden sm:block">ANTALYA · 5—9 OCT 2026</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="min-w-0 lg:col-span-7">
                <p className="label label-signal mb-5" data-reveal>
                  77TH INTERNATIONAL ASTRONAUTICAL CONGRESS · INTERACTIVE PRESENTATION
                </p>
                <h2 className="display display-xl invisible text-5xl leading-[0.95] sm:text-7xl" data-split>
                  Printing <span className="text-signal">in microgravity</span>, without adding an
                  actuator
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-dim" data-reveal>
                  <em>Real-Time Active Vibration Compensation in Microgravity Additive
                  Manufacturing via Kinematic Speed Modulation.</em> On a station, the
                  micro-vibration environment shows up directly in FDM surface quality. Instead of
                  adding a counter-actuator, the approach modulates the print head&apos;s
                  instantaneous kinematic speed in firmware so the motion never excites the
                  structure&apos;s resonances in the first place.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
                  {['FxLMS', 'Firmware-level control', 'ISS-like micro-vibration', 'No added hardware'].map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="mt-8 space-y-3 border-l-2 border-signal pl-5" data-reveal>
                  {[
                    'Research idea, experimental approach and system concept',
                    'Design of the control side',
                    'Built the physical test rig the work is validated on',
                  ].map((line) => (
                    <li key={line} className="text-sm leading-relaxed text-ink-dim">
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-10" data-reveal>
                  <Link
                    href="/research"
                    className="label-link group gap-3 font-mono text-xs tracking-[0.14em] text-signal"
                  >
                    READ THE RESEARCH PAGE
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>

              <div className="min-w-0 lg:col-span-5" data-reveal>
                <div className="dim mb-5" />
                <dl>
                  {[
                    ['VENUE', 'IAC 2026 · ANTALYA'],
                    ['FORMAT', 'INTERACTIVE PRESENTATION'],
                    ['DATES', '5 — 9 OCTOBER 2026'],
                    ['DOMAIN', 'IN-SPACE MANUFACTURING'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
                      <dt className="label">{k}</dt>
                      <dd className="label text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="card mt-8 p-6">
                  <p className="label label-signal mb-3">WHY IT MATTERS ON ORBIT</p>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    Anything printed on a station is printed inside its vibration environment.
                    Answering that in firmware rather than with another actuator means no added
                    mass, no added power draw, and no new hardware to qualify — three arguments
                    that decide things in space systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 04 · Embedded ---------- */}
        <section
          id="embedded"
          className="scroll-mt-16 border-y border-line bg-paper-2 px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">04</span>
              <span className="label">EMBEDDED SOFTWARE</span>
              <span className="label ml-auto hidden sm:block">ASPİLSAN ENERJİ · R&amp;D</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="min-w-0 lg:col-span-7">
                <h2 className="display display-xl invisible text-5xl leading-[0.95] sm:text-7xl" data-split>
                  HEDAP — <span className="text-signal">CAN bus analysis</span> for defence-grade
                  battery packs
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim" data-reveal>
                  A Qt6 / C++17 desktop platform for the engineers working on battery management
                  systems: Vector DBC parsing with Intel and Motorola bit layouts, live links over
                  UART, SLCAN and PCAN-USB, four synchronised real-time charts on a 50 ms batched
                  repaint, and a CSV replay mode for reading a recorded run back. Delivered for
                  internal R&amp;D use.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
                  {['Qt6', 'C++17', 'CMake', 'Vector DBC', 'SLCAN / PCAN-USB', 'UART'].map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="mailto:ali@dereyurt.dev?subject=HEDAP%20repo%20access%20request"
                  className="label label-link mt-8 underline-offset-4 transition-colors hover:text-signal hover:underline"
                  data-reveal
                >
                  PRIVATE REPO — REQUEST ACCESS ↗
                </a>
              </div>

              <div className="min-w-0 lg:col-span-5" data-reveal>
                <div className="dim mb-5" />
                <dl>
                  {[
                    ['ROLE', 'EMBEDDED SW INTERN'],
                    ['PERIOD', 'FEB — MAR 2026'],
                    ['DOMAIN', 'BMS · DEFENCE'],
                    ['DELIVERED', 'INTERNAL R&D TOOL'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
                      <dt className="label">{k}</dt>
                      <dd className="label text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="card mt-8 p-6">
                  <p className="label label-signal mb-3">ALSO IN THIS LANE</p>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    AVR / Arduino and STM32 firmware, I²C, SPI and GPIO bring-up, PID and FxLMS
                    control loops, and the instrumentation side of test rigs — from the shaker rig
                    firmware to the active landing controller on the model satellite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 05 · Shaker rig ---------- */}
        <section id="rig" className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">05</span>
              <span className="label">TEST INSTRUMENTATION — OPEN HARDWARE</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="min-w-0 lg:col-span-7">
                <h2 className="display display-xl invisible text-5xl leading-[0.95] sm:text-7xl" data-split>
                  Single-Axis <span className="text-signal">Shaker Rig</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim" data-reveal>
                  To reproduce the IAC study&apos;s disturbance physically on a bench I built the
                  disturbance itself: a single-axis shaker carrying mechanical layout and drive
                  selection, a STEP/DIR driver chain and power electronics, firmware on an Arduino
                  Nano, and a Python/Tk control application — mechanics, electronics, firmware,
                  desktop software and test logic in one project, published in full.
                </p>
                <ul className="mt-8 space-y-3 border-l-2 border-signal pl-5" data-reveal>
                  {[
                    'Mechanical layout and drive selection',
                    'STEP/DIR driver chain and power electronics',
                    'Firmware on an Arduino Nano',
                    'Python/Tk control software and the test logic around it',
                  ].map((line) => (
                    <li key={line} className="text-sm leading-relaxed text-ink-dim">
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com/dereyurtali/single-axis-shaker-rig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label label-link mt-8 underline-offset-4 transition-colors hover:text-signal hover:underline"
                  data-reveal
                >
                  GITHUB.COM/DEREYURTALI/SINGLE-AXIS-SHAKER-RIG ↗
                </a>
              </div>

              <div className="min-w-0 lg:col-span-5">
                <div className="grid-paper grid grid-cols-2 border border-line">
                  {RIG_STATS.map(([value, label], i) => (
                    <div
                      key={label}
                      className={`flex min-h-[120px] flex-col justify-center p-5 sm:min-h-[150px] sm:p-7 ${
                        i % 2 === 0 ? 'border-r border-line' : ''
                      } ${i < 2 ? 'border-b border-line' : ''}`}
                      data-reveal
                    >
                      <p className="display text-3xl leading-none text-signal sm:text-4xl">{value}</p>
                      <p className="label mt-3 leading-relaxed">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 06 · Publications & additive manufacturing ---------- */}
        <section className="border-y border-line bg-paper-2 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-12" data-reveal>
              <span className="label label-signal">06</span>
              <span className="label">PUBLICATIONS — IN PREPARATION</span>
            </div>
            <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
              {PAPERS.map((p) => (
                <div key={p.title} className="bg-card p-6 sm:p-8" data-reveal>
                  <h3 className="text-base leading-snug text-ink">{p.title}</h3>
                  <p className="label mt-3">{p.authors.toUpperCase()}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-dim">{p.description}</p>
                </div>
              ))}
            </div>

            <div className="title-block mb-8 mt-16" data-reveal>
              <span className="label label-signal">06.2</span>
              <span className="label">PRODUCTION EXPERIENCE — ADDITIVE MANUFACTURING</span>
            </div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {PRODUCTION.map(([org, meta, body]) => (
                <div key={org} className="bg-card p-6 sm:p-8" data-reveal>
                  <p className="label label-signal mb-2">{org}</p>
                  <p className="label mb-4">{meta}</p>
                  <p className="text-sm leading-relaxed text-ink-dim">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 07 · Earlier aerospace ---------- */}
        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-8" data-reveal>
              <span className="label label-signal">07</span>
              <span className="label">EARLIER AEROSPACE WORK</span>
            </div>
            <div className="work-list">
              {EARLIER.map((w) => (
                <article
                  key={w.index}
                  className="work-row group border-t border-line py-10 transition-colors hover:bg-paper-2 sm:py-12"
                >
                  <div className="grid gap-6 sm:grid-cols-12 sm:items-baseline">
                    <p className="label sm:col-span-1">{w.index}</p>
                    <div className="sm:col-span-5">
                      <h3 className="display text-4xl leading-[0.95] transition-colors group-hover:text-signal sm:text-6xl">
                        {w.title}
                      </h3>
                      <p className="label mt-3">{w.subtitle.toUpperCase()}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-dim sm:col-span-4">{w.description}</p>
                    <div className="flex gap-5 sm:col-span-2 sm:justify-end">
                      <Link
                        href={w.href}
                        className="label label-link underline-offset-4 transition-colors hover:text-signal hover:underline"
                      >
                        CASE STUDY →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
              <div className="rule" data-rule />
            </div>
          </div>
        </section>

        {/* ---------- 08 · Software systems ---------- */}
        <section id="software" className="scroll-mt-16 border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">08</span>
              <span className="label">SOFTWARE SYSTEMS</span>
              <span className="label ml-auto hidden sm:block">2023 — 2026</span>
            </div>

            <div className="featured-panel relative overflow-hidden border border-line bg-card">
              <div className="grid lg:grid-cols-12">
                {/* text side — clean paper, fully readable */}
                <div className="min-w-0 p-6 sm:p-10 lg:col-span-7 lg:p-14">
                  <p className="label mb-5" data-reveal>
                    08.1 — PRODUCTION HIS
                  </p>
                  <h2 className="display display-xl invisible text-6xl leading-[0.95] sm:text-8xl" data-split>
                    AirMed <span className="text-signal">HBYS</span>
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim" data-reveal>
                    Multi-tenant hospital information system with an LLM patient assistant that
                    books real appointments over WhatsApp, Telegram and Instagram. 95 database
                    models, PostgreSQL row-level security, trilingual UI.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
                    {['Agentic Tool-Use', 'Claude / OpenRouter', 'NestJS · tRPC · Prisma', 'PostgreSQL RLS'].map(
                      (t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      )
                    )}
                  </div>
                  <ul className="mt-10 space-y-3 border-l-2 border-signal pl-5" data-reveal>
                    {[
                      'Model loop never holds a DB connection — three-phase transaction design',
                      '115 hand-reviewed migrations — RLS tenancy, partitioned audit logs, race-free counters',
                      'Log watcher auto-opens issues; in-app button files feature requests to GitHub',
                      'Auto-fix agent drafts PRs from PII-scrubbed error context',
                    ].map((line) => (
                      <li key={line} className="text-sm leading-relaxed text-ink-dim">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10" data-reveal>
                    <WatchCta />
                    <a
                      href="https://github.com/dereyurtali/airmed-hbys-showcase"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label label-link mt-5 underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      READ THE CODE ON GITHUB ↗
                    </a>
                  </div>
                </div>

                {/* animation side — AirMed'in gerçek mimarisi, canlı şema */}
                <div className="grid-paper relative flex min-h-[300px] min-w-0 items-center justify-center border-t border-line p-4 pb-12 sm:min-h-[380px] sm:p-6 sm:pb-12 lg:col-span-5 lg:border-l lg:border-t-0">
                  {/* Aynı şema, iki yerleşim: telefonda dikey olan çizilir, çünkü yatay
                      olanı 316px'e sıkışınca etiketleri 3px'e düşüyor. */}
                  <AirmedSchematic variant="compact" className="h-auto w-full max-w-[340px] sm:hidden" />
                  <AirmedSchematic className="mx-auto hidden h-auto w-full max-w-[720px] sm:block" />
                  <p className="label absolute bottom-3 left-4 bg-paper/85 px-2 py-1">
                    AIRMED — SYSTEM SCHEMATIC <span className="text-signal">· LIVE</span>
                  </p>
                </div>
              </div>
            </div>

            {/* work rows */}
            <div className="work-list mt-4">
              {WORK.map((w) => (
                <article key={w.index} className="work-row group border-t border-line py-10 transition-colors hover:bg-paper-2 sm:py-12">
                  <div className="grid gap-6 sm:grid-cols-12 sm:items-baseline">
                    <p className="label sm:col-span-1">{w.index}</p>
                    <div className="sm:col-span-5">
                      <h3 className="display text-4xl leading-[0.95] transition-colors group-hover:text-signal sm:text-6xl">
                        {w.title}
                      </h3>
                      <p className="label mt-3">{w.subtitle.toUpperCase()}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-dim sm:col-span-4">{w.description}</p>
                    <div className="flex gap-5 sm:col-span-2 sm:justify-end">
                      {w.links.map((l) =>
                        'internal' in l && l.internal ? (
                          <Link
                            key={l.label}
                            href={l.href}
                            className="label label-link underline-offset-4 transition-colors hover:text-signal hover:underline"
                          >
                            {l.label.toUpperCase()} →
                          </Link>
                        ) : (
                          <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="label label-link underline-offset-4 transition-colors hover:text-signal hover:underline"
                          >
                            {l.label.toUpperCase()} ↗
                          </a>
                        )
                      )}
                    </div>
                  </div>
                  {/* the clinic row carries its n8n workflows as clickable drawings */}
                  {w.title === 'Clinic AI Automation' && <ClinicFlows />}
                </article>
              ))}
              <div className="rule" data-rule />
            </div>
          </div>
        </section>

        {/* ---------- 09 · Studio: where the client work ships from ---------- */}
        <section id="studio" className="scroll-mt-16 px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">09</span>
              <span className="label">STUDIO</span>
              <a
                href="https://dnasoft.co"
                target="_blank"
                rel="noopener noreferrer"
                className="label label-link ml-auto transition-colors hover:text-signal"
              >
                DNASOFT.CO ↗
              </a>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="min-w-0 lg:col-span-7">
                <h2 className="display display-xl invisible text-5xl leading-[0.95] sm:text-7xl" data-split>
                  DNA <span className="text-signal">Software</span> Solutions
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim" data-reveal>
                  The studio I build under — EU-registered in Greece, run from Istanbul. AirMed HBYS
                  and Vonguard ship through it, which means I don&apos;t hand a system over at launch:
                  I scope it, build it, deploy it, and stay on call while it runs in a real clinic.
                </p>
              </div>

              <dl className="min-w-0 lg:col-span-5 lg:self-end" data-reveal>
                {STUDIO_SPECS.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
                    <dt className="label">{k}</dt>
                    <dd className="label text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The name, doing structural work: the strand runs the width of the band
                and each base pair drops a leader into the capability under it. */}
            <div className="mt-16">
              <StudioSpine className="hidden h-[110px] w-full lg:block" />
              <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
                {STUDIO_CAPABILITIES.map(([title, body], i) => (
                  <div key={title} className="bg-card p-6">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
                      0{i + 1}
                    </p>
                    <p className="label label-signal mb-3 mt-4">{title}</p>
                    <p className="text-sm leading-relaxed text-ink-dim">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 10 · Process band ---------- */}
        <section className="border-y border-line bg-paper-2 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-12" data-reveal>
              <span className="label label-signal">10</span>
              <span className="label">HOW I WORK</span>
            </div>
            <h2 className="display invisible max-w-4xl text-4xl leading-[0.98] sm:text-6xl" data-split>
              AI agents in the loop — <span className="text-signal">mistakes made structurally
              impossible.</span>
            </h2>
            <div
              className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
              data-reveal
            >
              {PROCESS.map(([title, body], i) => (
                <div key={title} className="bg-card p-6">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">0{i + 1}</p>
                  <p className="label label-signal mb-3 mt-4">{title}</p>
                  <p className="text-sm leading-relaxed text-ink-dim">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10" data-reveal>
              <Link
                href="/airmed"
                className="label-link group gap-3 font-mono text-xs tracking-[0.14em] text-signal"
              >
                SEE THE FULL PIPELINE, ANIMATED
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- 11 · Contact: robotic arm draws the closing line ---------- */}
        <section id="contact" className="contact-section relative scroll-mt-16 overflow-hidden px-5 pb-28 pt-16 sm:px-8 sm:pb-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <AmbientVideo
              src="/videos/fig-arm.mp4"
              poster="/videos/fig-arm-poster.jpg"
              className="contact-video h-full w-full object-cover opacity-[0.1] mix-blend-multiply"
            />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
          </div>
          <div className="relative mx-auto max-w-[1440px]">
            <div className="rule mb-14" data-rule />
            <p className="label label-signal mb-8" data-reveal>
              11 — CONTACT
            </p>

            {/* data-split must sit on the element that carries `invisible`,
                otherwise GSAP reveals the wrapper and the heading stays hidden. */}
            <h2
              className="contact-title display display-xl invisible text-[13vw] leading-[0.92] sm:text-[9vw]"
              data-split
            >
              Let&apos;s build something real<span className="text-signal">.</span>
            </h2>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal>
              <div className="lg:col-span-7">
                <a
                  href="mailto:ali@dereyurt.dev"
                  className="cta group block w-full max-w-lg border border-ink bg-card"
                >
                  <span className="flex items-stretch">
                    <span className="flex-1 px-6 py-5">
                      <span className="block font-mono text-[13px] tracking-[0.16em] text-ink">
                        ALI@DEREYURT.DEV
                      </span>
                      <span className="mt-2 block font-mono text-[11px] tracking-[0.1em] text-ink-faint">
                        I READ EVERY MAIL — REPLY WITHIN A DAY
                      </span>
                    </span>
                    <span className="flex w-16 items-center justify-center border-l border-ink text-xl leading-none">
                      <span className="cta-arrow">→</span>
                    </span>
                  </span>
                </a>
              </div>

              <dl className="lg:col-span-4 lg:col-start-9">
                <div className="dim mb-5" />
                <div className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="label">STATUS</dt>
                  <dd className="label flex items-center gap-2 text-ink">
                    <span className="inline-block h-2 w-2 bg-green" aria-hidden />
                    OPEN TO WORK
                  </dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="label">BASED IN</dt>
                  <dd className="label text-ink">ISTANBUL, TR</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="label">WORKING</dt>
                  <dd className="label text-ink">ON-SITE · HYBRID · REMOTE</dd>
                </div>
              </dl>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6" data-reveal>
              <div className="flex flex-wrap gap-8">
                <a
                  href="https://github.com/dereyurtali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label label-link transition-colors hover:text-signal"
                >
                  GITHUB ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/alidereyurt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label label-link transition-colors hover:text-signal"
                >
                  LINKEDIN ↗
                </a>
                <Link href="/cv" className="label label-link transition-colors hover:text-signal">
                  CV
                </Link>
                <a
                  href="/docs/Ali-Dereyurt-Portfolio.pdf"
                  className="label label-link transition-colors hover:text-signal"
                  download
                >
                  PORTFOLIO (PDF) ↓
                </a>
              </div>
              <p className="label">© {new Date().getFullYear()} ALI DEREYURT</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
