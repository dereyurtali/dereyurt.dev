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
  'AGENTIC TOOL-USE · CLAUDE / OPENROUTER · N8N · POSTGRESQL RLS · NESTJS · NEXT.JS · CI/CD ON SELF-HOSTED RUNNERS';

const WORK = [
  {
    index: '02',
    title: 'Clinic AI Automation',
    subtitle: 'n8n-orchestrated operations for an eye hospital',
    description:
      'LLM conversation agent with intent classification + n8n workflows wiring the CRM, Google Workspace and the clinic\'s EHR over REST, OAuth 2.0 and webhooks, plus a computer-vision document pipeline. 90%+ less manual work, 24/7 patient support.',
    links: [],
  },
  {
    index: '03',
    title: 'Printimize',
    subtitle: 'AI-powered 3D print parameter optimization',
    description:
      'Claude vision with forced tool-use for structured defect analysis; Bayesian optimization over ML models trained on real lab measurements.',
    links: [
      { label: 'Case study', href: '/parameter', internal: true },
      { label: 'Live', href: 'https://parameterapp.dereyurt.dev' },
      { label: 'GitHub', href: 'https://github.com/dereyurtali/printimize-showcase' },
    ],
  },
  {
    index: '04',
    title: 'UX Principles Skill',
    subtitle: 'A Claude Code skill used by other developers',
    description:
      'Seven classic design books distilled into rules and review heuristics Claude applies while building UIs. Open source.',
    links: [{ label: 'GitHub', href: 'https://github.com/dereyurtali/ux-principles-skill' }],
  },
  {
    index: '05',
    title: 'AirMed Monitor',
    subtitle: 'Live ops panel for my AI dev pipeline',
    description:
      'Real-time instrument panel I use daily while building AirMed — runner queues, CI jobs and staging deploys on one screen.',
    links: [
      { label: 'Live', href: 'https://dereyurtali.github.io/airmed-monitor/' },
      { label: 'GitHub', href: 'https://github.com/dereyurtali/airmed-monitor' },
    ],
  },
  {
    index: '06',
    title: 'HEDAP',
    subtitle: 'CAN bus analysis platform — Qt6 / C++17',
    description:
      'Cross-platform desktop tool for BMS engineers: Vector DBC decode, UART/SLCAN/PCAN live telemetry, four synchronized real-time charts. Built AI-orchestrated at ASPİLSAN R&D and delivered as their internal tool. Repo is private — access granted on request.',
    links: [
      {
        label: 'Private repo — request access',
        href: 'mailto:ali@dereyurt.dev?subject=HEDAP%20repo%20access%20request',
      },
    ],
  },
  {
    index: '07',
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

const EARLIER = [
  { title: 'TÜRKSAT Model Satellite 2022', meta: 'System Lead · PID landing · YOLOv4', href: '/turksat-muy-2022' },
  { title: 'TÜRKSAT Model Satellite 2021', meta: 'Team Lead · autogyro', href: '/turksat-muy-2021' },
  { title: 'CanSat Spin Stabilization', meta: 'NASA CanSat', href: '/cansat-stabilization' },
  { title: 'ROKETSAN / TÜBİTAK Rocket', meta: 'Payload structures', href: '/cv' },
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

        // Work rows: staggered entrance
        gsap.from('.work-row', {
          autoAlpha: 0,
          y: 44,
          duration: 0.9,
          stagger: 0.12,
          ease: EASE_OUT,
          scrollTrigger: { trigger: '.work-list', start: 'top 85%' },
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
            No slogan. A recruiter is told nothing and shown one thing instead: an
            agentic turn going through classification, a guardrail, a tool call and
            a row-level-secured transaction, live, on loop. */}
        <section className="hero-pin grid-paper relative flex min-h-svh flex-col overflow-hidden border-b border-line px-5 pb-8 pt-20 sm:px-8 sm:pt-24">
          {/* Drifting theme-coloured circles on the graph paper — translucent ink
              keeps them under the type; they gather gently around a slow cursor
              (see OrbField for the behaviour). No blend mode: the rgba fills
              already let the grid through, and multiply cost a compositing pass
              on every frame of an always-animating canvas. */}
          <div className="hero-orbs-wrap pointer-events-none absolute inset-0" aria-hidden>
            <OrbField className="h-full w-full" />
          </div>

          {/* the copy block sits in the middle of whatever height is left, so the
              hero neither clips on a phone nor leaves a void on a desktop */}
          <div className="flex flex-1 items-center">
            <div className="hero-copy relative mx-auto w-full max-w-[1440px]">
              <div className="mb-8 flex items-center justify-between">
                <p className="hero-meta label">AI DEVELOPER — ISTANBUL, TR</p>
                <p className="hero-meta label hidden items-center gap-2 sm:flex">
                  <span className="inline-block h-2 w-2 animate-pulse bg-green" />
                  OPEN TO WORK
                </p>
              </div>

              {/* DOM order is name → panel → role, which on a phone puts the proof
                  inside the first screen; on lg the grid pulls the panel to the right
                  column and the role back under the name. */}
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
                  I build <span className="text-ink">agentic systems</span> — LLM tool-use wired
                  into real databases, with the guardrails and pipelines that keep them safe in
                  production.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[1440px]">
            <div className="hero-strip dim mb-4" />
            <p className="hero-caps label">{CAPABILITIES}</p>
          </div>
        </section>

        {/* ---------- Featured: AirMed over scrubbed system-topology video ---------- */}
        <section id="work" className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">01</span>
              <span className="label">SELECTED WORK</span>
              <span className="label ml-auto hidden sm:block">2023 — 2026</span>
            </div>

            <div className="featured-panel relative overflow-hidden border border-line bg-card">
              <div className="grid lg:grid-cols-12">
                {/* text side — clean paper, fully readable */}
                <div className="min-w-0 p-6 sm:p-10 lg:col-span-7 lg:p-14">
                  <p className="label mb-5" data-reveal>
                    FLAGSHIP — PRODUCTION HIS
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
          </div>
        </section>

        {/* ---------- Work rows ---------- */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="work-list mx-auto max-w-[1440px]">
            {WORK.map((w) => (
              <article key={w.index} className="work-row group border-t border-line py-10 transition-colors hover:bg-paper-2 sm:py-12">
                <div className="grid gap-6 sm:grid-cols-12 sm:items-baseline">
                  <p className="label sm:col-span-1">NO. {w.index}</p>
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
        </section>

        {/* ---------- Studio: where the client work ships from ---------- */}
        <section id="studio" className="scroll-mt-16 px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">02</span>
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

        {/* ---------- Process band ---------- */}
        <section className="border-y border-line bg-paper-2 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-12" data-reveal>
              <span className="label label-signal">03</span>
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

        {/* ---------- Earlier work ---------- */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-8" data-reveal>
              <span className="label label-signal">04</span>
              <span className="label">EARLIER WORK — AEROSPACE</span>
            </div>
            {EARLIER.map((e) => (
              <Link
                key={e.title}
                href={e.href}
                className="group flex items-baseline justify-between gap-4 border-b border-line py-6"
                data-reveal
              >
                <span className="display text-xl text-ink-dim transition-colors group-hover:text-signal sm:text-2xl">
                  {e.title}
                </span>
                <span className="label hidden text-right sm:block">{e.meta}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- Contact: robotic arm draws the closing line ---------- */}
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
              05 — CONTACT
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
              </div>
              <p className="label">© {new Date().getFullYear()} ALI DEREYURT</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
