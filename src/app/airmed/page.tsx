'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, EASE_OUT } from '@/lib/animation';
import { DIAGRAMS } from '@/components/pipeline/diagrams';
import SiteHeader, { HOME_NAV } from '@/components/SiteHeader';
import AirmedShots from '@/components/AirmedShots';

gsap.registerPlugin(useGSAP);

const STAGES = [
  {
    rail: '01 — FEATURE ISSUE',
    title: 'A feature is requested. An issue opens.',
    body: 'Staff request features from inside the app; the request lands as a labeled GitHub issue.',
  },
  {
    rail: '02 — PARALLEL SESSION',
    title: 'One issue. One branch. One worktree. One session.',
    body: 'Sessions run in parallel, isolated. Hooks physically block edits in the main clone.',
  },
  {
    rail: '03 — FAST GATE',
    title: 'The fast gate answers in minutes.',
    body: 'Lint, strict typecheck and unit tests on self-hosted runners. This lane blocks the merge.',
  },
  {
    rail: '04 — STAGE GROUPS',
    title: 'Stage groups run the heavy suite.',
    body: 'Ordered e2e groups, each worker on its own isolated database.',
  },
  {
    rail: '05 — AUTO STAGING',
    title: 'Merge. Staging deploys itself.',
    body: 'Every squash-merge builds and ships to a box reachable only over a private Tailscale mesh.',
  },
  {
    rail: '06 — PRODUCTION',
    title: 'Rehearse first. Deploy second.',
    body: 'Two backups, the migration rehearsed on a copy, a health check — and rollback if anything moves.',
  },
  {
    rail: '07 — THE LOOP',
    title: 'The loop closes itself.',
    body: 'A log watcher turns production errors into issues; an agent drafts the fix. Humans merge.',
  },
];

export default function AirmedPage() {
  const root = useRef<HTMLDivElement>(null);
  const timelines = useRef<(gsap.core.Timeline | null)[]>(Array(STAGES.length).fill(null));

  useGSAP(
    () => {
      const ctx = root.current!;
      const N = STAGES.length;
      const mm = gsap.matchMedia();

      // Desktop: one screen, pinned, the story scrubbed by the scroll wheel.
      mm.add('(min-width: 1024px)', () => {
        const stages = gsap.utils.toArray<HTMLElement>('.stage', ctx);
        const steps = gsap.utils.toArray<HTMLElement>('.rail-step', ctx);
        const railFill = ctx.querySelector<HTMLElement>('.rail-fill')!;
        const barFill = ctx.querySelector<HTMLElement>('.bar-fill')!;
        const counter = ctx.querySelector<HTMLElement>('.stage-counter')!;
        let current = -1;

        const setStage = (idx: number) => {
          if (idx === current) return;
          timelines.current.forEach((tl, i) => {
            if (!tl) return;
            if (i < idx) tl.progress(1);
            if (i > idx) tl.progress(0);
          });
          current = idx;
          stages.forEach((s, i) => {
            if (i === idx) {
              gsap.to(s, { autoAlpha: 1, y: 0, duration: 0.45, ease: EASE_OUT, overwrite: 'auto' });
            } else {
              gsap.to(s, { autoAlpha: 0, y: i < idx ? -24 : 24, duration: 0.3, overwrite: 'auto' });
            }
          });
          steps.forEach((s, i) => {
            s.classList.toggle('is-active', i === idx);
            s.classList.toggle('is-done', i < idx);
          });
          counter.textContent = `STEP ${idx + 1} / ${N}`;
        };

        gsap.set(stages, { autoAlpha: 0, y: 24 });

        const apply = (p: number) => {
          const raw = Math.min(N - 0.0001, p * N);
          const idx = Math.floor(raw);
          const local = gsap.utils.clamp(0, 1, (raw - idx) * 1.35);
          gsap.set(railFill, { height: `${p * 100}%` });
          gsap.set(barFill, { width: `${p * 100}%` });
          setStage(idx);
          timelines.current[idx]?.progress(local);
        };

        // The scroll position only sets a TARGET; what's on screen walks toward
        // it at a capped, steady pace. A flick to the bottom therefore plays the
        // whole story through, readable, instead of teleporting past six steps.
        let target = 0;
        let shown = 0;
        let primed = false;

        const SPEED = 0.34; // full-story units/s — one step ≈ 0.42s of catch-up
        const SLOW_ZONE = 0.16; // last stretch of a step where the pace sinks…
        const FLOOR = 0.32; // …down to this fraction, a beat on the finished drawing

        const tick = (_t: number, deltaMs: number) => {
          const dist = target - shown;
          if (!primed || Math.abs(dist) < 0.00001) return;
          const dt = Math.min(deltaMs / 1000, 0.05);
          const dir = Math.sign(dist);
          // ease off approaching whichever step boundary we're travelling into,
          // pick the pace back up right after crossing it
          const frac = (shown * N) % 1;
          const toBoundary = dir > 0 ? 1 - frac : frac;
          let v = SPEED * (FLOOR + (1 - FLOOR) * Math.min(1, toBoundary / SLOW_ZONE));
          // and settle into the stop instead of clipping to it
          v = Math.min(v, Math.max(Math.abs(dist) * 5, 0.03));
          shown += dir * Math.min(Math.abs(dist), v * dt);
          apply(shown);
        };
        gsap.ticker.add(tick);

        const st = ScrollTrigger.create({
          trigger: '.pipe-pin',
          start: 'top top',
          end: `+=${N * 140}%`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            target = self.progress;
          },
          // arriving mid-page (reload, hash) starts in place, not with a replay
          onRefresh: (self) => {
            target = self.progress;
            if (!primed) {
              primed = true;
              shown = target;
              apply(shown);
            }
          },
        });

        if (!primed) {
          primed = true;
          target = st.progress;
          shown = target;
          apply(shown);
        }
        // The pin above inserts ~10 viewport-heights of spacer AFTER child
        // components (the product showcase) already measured their triggers.
        // Without this remeasure their start/end stay pre-spacer — the
        // showcase then runs its pages while the pipeline is still pinned.
        ScrollTrigger.refresh();
        return () => {
          gsap.ticker.remove(tick);
          gsap.set(stages, { clearProps: 'all' });
        };
      });

      // Touch: pinning a screen and scrubbing sideways drawings is miserable on a
      // phone, so the seven steps simply stack and each drawing draws itself once,
      // as it comes into view.
      mm.add('(max-width: 1023px)', () => {
        const stages = gsap.utils.toArray<HTMLElement>('.stage', ctx);
        gsap.set(stages, { autoAlpha: 1, y: 0 });
        stages.forEach((stage, i) => {
          gsap.from(stage, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            ease: EASE_OUT,
            scrollTrigger: { trigger: stage, start: 'top 88%' },
          });
          ScrollTrigger.create({
            trigger: stage,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              const tl = timelines.current[i];
              if (tl) gsap.to(tl, { progress: 1, duration: 1.6, ease: 'none' });
            },
          });
        });
      });

      gsap.from('.pipe-intro > *', {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: EASE_OUT,
        delay: 0.1,
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* ---------- Header ---------- */}
      <SiteHeader items={HOME_NAV} />

      <main>
        {/* ---------- Pinned, scroll-drawn pipeline ---------- */}
        <section className="pipe-pin grid-paper relative flex flex-col overflow-hidden px-5 pb-16 sm:px-8 lg:h-svh lg:pb-0">
          <div className="pipe-intro relative mx-auto w-full max-w-[1440px] pt-24 sm:pt-28">
            <Link
              href="/#work"
              className="label label-link mb-5 inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-signal hover:underline"
            >
              ← BACK TO WORK
            </Link>
            <p className="label label-signal">AIRMED HBYS — HOW IT&apos;S BUILT</p>
            <h1 className="display mt-2 text-3xl leading-[0.95] sm:text-5xl">
              One feature&apos;s journey to production.
            </h1>
          </div>

          <div className="relative mx-auto grid w-full min-w-0 max-w-[1440px] flex-1 items-center gap-6 sm:gap-12 lg:grid-cols-[280px_1fr]">
            {/* rail */}
            <div className="rail relative hidden pl-7 lg:block">
              <div className="absolute bottom-2 left-2 top-2 w-px bg-line" />
              <div className="rail-fill absolute left-2 top-2 w-px bg-signal" style={{ height: 0 }} />
              {STAGES.map((s) => (
                <div key={s.rail} className="rail-step relative py-3">
                  <span className="rail-dot absolute -left-5 top-1/2 h-2 w-2 -translate-y-1/2 border border-line-2 bg-paper transition-all duration-300" />
                  <span className="label label-link transition-colors duration-300">{s.rail}</span>
                </div>
              ))}
            </div>

            {/* stages — each with its own scroll-drawn diagram */}
            <div className="relative w-full min-w-0 space-y-20 lg:min-h-[440px] lg:space-y-0">
              {STAGES.map((s, i) => {
                const Diagram = DIAGRAMS[i];
                return (
                  <div key={s.rail} className="stage flex min-w-0 flex-col justify-center gap-4 lg:absolute lg:inset-0">
                    <p className="label label-signal lg:hidden">{s.rail}</p>
                    <h2 className="display max-w-2xl text-2xl leading-[0.98] sm:text-4xl">{s.title}</h2>
                    <p className="max-w-xl text-sm leading-relaxed text-ink-dim sm:text-[15px]">{s.body}</p>
                    {/* below lg the drawing keeps its true 720×340 size and the frame
                        swipes; squeezed into 600×280 its labels dropped to ~6px */}
                    <div className="-mx-5 mt-2 overflow-x-auto px-5 lg:mx-0 lg:overflow-visible lg:px-0">
                      <div
                        className="fig-stage"
                        style={{ '--fig-w': '720px', '--fig-h': '340px', '--fig-h-lg': '360px' } as React.CSSProperties}
                      >
                        <Diagram register={(tl) => (timelines.current[i] = tl)} />
                      </div>
                    </div>
                    <p className="label text-signal lg:hidden">SWIPE THE DRAWING →</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* progress */}
          <div className="relative mx-auto hidden w-full max-w-[1440px] pb-6 lg:block">
            <div className="h-px overflow-hidden bg-line">
              <div className="bar-fill h-full bg-signal" style={{ width: 0 }} />
            </div>
            <div className="mt-2.5 flex justify-between">
              <span className="label">SCROLL TO ADVANCE</span>
              <span className="stage-counter label">STEP 1 / 7</span>
            </div>
          </div>
        </section>

        {/* ---------- The product, page by page ---------- */}
        <section className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block mb-12" data-shots-reveal>
              <span className="label label-signal">THE PRODUCT</span>
              <span className="label">PAGE BY PAGE</span>
            </div>
            <AirmedShots />
          </div>
        </section>

        {/* ---------- After ---------- */}
        <section className="px-5 py-28 sm:px-8 sm:py-36">
          <div className="mx-auto max-w-[1440px]">
            <p className="label label-signal mb-6">THE RESULT</p>
            <h2 className="display max-w-3xl text-4xl leading-[0.98] sm:text-6xl">
              A production HIS where <span className="text-signal">AI ships features</span> — and
              can&apos;t break anything.
            </h2>
            <div className="mt-14 flex flex-wrap items-center gap-6">
              <a
                href="https://github.com/dereyurtali/airmed-hbys-showcase"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 font-mono text-xs tracking-[0.14em] text-paper transition-colors hover:border-signal hover:bg-signal"
              >
                READ THE CODE ON GITHUB
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <Link href="/" className="label label-link underline-offset-4 transition-colors hover:text-ink hover:underline">
                ← BACK TO WORK
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
