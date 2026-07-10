'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, splitLines, EASE_OUT } from '@/lib/animation';
import AirmedSchematic from '@/components/AirmedSchematic';
import WatchCta from '@/components/WatchCta';
import AmbientVideo from '@/components/AmbientVideo';

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
      'Cross-platform desktop tool for BMS engineers: Vector DBC decode, UART/SLCAN/PCAN live telemetry, four synchronized real-time charts. Built AI-orchestrated at ASPİLSAN R&D and delivered as their internal tool.',
    links: [{ label: 'GitHub', href: 'https://github.com/dereyurtali/HEDAP' }],
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
        // ---------- Hero: canlı çizim masası — video kendi kendine akar ----------
        gsap.from('.hero-video-wrap', { autoAlpha: 0, duration: 1.6, ease: 'power2.out', delay: 0.4 });

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
          .from('.hero-meta', { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.08 }, '-=0.8')
          .from('.hero-strip', { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power3.inOut' }, '-=0.9')
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
      <header className="fixed top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="label label-signal">
            ALI DEREYURT
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-10">
            <a href="#work" className="label transition-colors hover:text-ink">
              WORK
            </a>
            <Link href="/airmed" className="label transition-colors hover:text-ink">
              HOW I BUILD
            </Link>
            <Link href="/cv" className="label transition-colors hover:text-ink">
              CV
            </Link>
            <a href="#contact" className="label transition-colors hover:text-ink">
              CONTACT
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- Hero: full-bleed scroll-scrubbed drafting video ---------- */}
        <section className="hero-pin grid-paper relative flex h-svh flex-col justify-between overflow-hidden border-b border-line px-5 pt-24 sm:px-8">
          {/* full-bleed video layer, scrubbed by scroll */}
          <div className="hero-video-wrap pointer-events-none absolute inset-0" aria-hidden>
            {/* Filigran: multiply ile kâğıda basılı, metnin kontrastını bozmayacak yoğunlukta */}
            <AmbientVideo
              eager
              src="/videos/fig-satellite.mp4"
              poster="/videos/fig-satellite-poster.jpg"
              className="hero-video h-full w-full object-cover opacity-[0.28] mix-blend-multiply"
            />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />
          </div>

          <div className="hero-copy relative mx-auto w-full max-w-[1440px]">
            <div className="mb-8 flex items-center justify-between">
              <p className="hero-meta label">AI DEVELOPER — ISTANBUL, TR</p>
              <p className="hero-meta label hidden items-center gap-2 sm:flex">
                <span className="inline-block h-2 w-2 animate-pulse bg-green" />
                OPEN TO WORK
              </p>
            </div>

            <h1 className="hero-title display display-xl invisible text-[15vw] leading-[0.92] sm:text-[11vw] lg:text-[9.6vw]">
              Systems where <span className="text-signal">AI does real work</span> — safely, in
              production.
            </h1>

          </div>

          <div className="relative mx-auto w-full max-w-[1440px] pb-8">
            <div className="hero-strip dim mb-4" />
            <p className="hero-caps label">{CAPABILITIES}</p>
          </div>
        </section>

        {/* ---------- Featured: AirMed over scrubbed system-topology video ---------- */}
        <section id="work" className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-14" data-reveal>
              <span className="label label-signal">01</span>
              <span className="label">SELECTED WORK</span>
              <span className="label ml-auto hidden sm:block">2023 — 2026</span>
            </div>

            <div className="featured-panel relative overflow-hidden border border-line bg-card">
              <div className="grid lg:grid-cols-12">
                {/* text side — clean paper, fully readable */}
                <div className="p-8 sm:p-14 lg:col-span-7">
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
                      className="label mt-5 inline-block underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      READ THE CODE ON GITHUB ↗
                    </a>
                  </div>
                </div>

                {/* animation side — AirMed'in gerçek mimarisi, canlı şema */}
                <div className="grid-paper relative flex min-h-[380px] items-center justify-center border-t border-line p-6 lg:col-span-5 lg:border-l lg:border-t-0">
                  <AirmedSchematic />
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
                          className="label underline-offset-4 transition-colors hover:text-signal hover:underline"
                        >
                          {l.label.toUpperCase()} →
                        </Link>
                      ) : (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label underline-offset-4 transition-colors hover:text-signal hover:underline"
                        >
                          {l.label.toUpperCase()} ↗
                        </a>
                      )
                    )}
                  </div>
                </div>
              </article>
            ))}
            <div className="rule" data-rule />
          </div>
        </section>

        {/* ---------- Process band ---------- */}
        <section className="border-y border-line bg-paper-2 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-12" data-reveal>
              <span className="label label-signal">02</span>
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
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-signal"
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
              <span className="label label-signal">03</span>
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
        <section id="contact" className="contact-section relative overflow-hidden px-5 pb-28 pt-16 sm:px-8 sm:pb-32">
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
              04 — CONTACT
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
                  className="cta group block max-w-lg border border-ink bg-card"
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
                  className="label transition-colors hover:text-signal"
                >
                  GITHUB ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/alidereyurt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label transition-colors hover:text-signal"
                >
                  LINKEDIN ↗
                </a>
                <Link href="/cv" className="label transition-colors hover:text-signal">
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
