'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, EASE_OUT } from '@/lib/animation';
import { DIAGRAMS } from '@/components/pipeline/diagrams';

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
      const stages = gsap.utils.toArray<HTMLElement>('.stage', ctx);
      const steps = gsap.utils.toArray<HTMLElement>('.rail-step', ctx);
      const railFill = ctx.querySelector<HTMLElement>('.rail-fill')!;
      const barFill = ctx.querySelector<HTMLElement>('.bar-fill')!;
      const counter = ctx.querySelector<HTMLElement>('.stage-counter')!;
      const N = STAGES.length;
      let current = -1;

      const setStage = (idx: number) => {
        if (idx === current) return;
        // geçilen adımların çizimi tamamlanmış, gelmeyenler boş dursun
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

      ScrollTrigger.create({
        trigger: '.pipe-pin',
        start: 'top top',
        end: `+=${N * 140}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const raw = Math.min(N - 0.0001, p * N);
          const idx = Math.floor(raw);
          // adım içi ilerleme: diyagram scroll'la kare kare çizilir,
          // adımın son üçte biri okumaya kalsın diye 1.35× hızlandırılır
          const local = gsap.utils.clamp(0, 1, (raw - idx) * 1.35);
          gsap.set(railFill, { height: `${p * 100}%` });
          gsap.set(barFill, { width: `${p * 100}%` });
          setStage(idx);
          timelines.current[idx]?.progress(local);
        },
      });

      setStage(0);

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
      <header className="fixed top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="label label-signal">
            ALI DEREYURT
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-10">
            <Link href="/#work" className="label transition-colors hover:text-ink">
              WORK
            </Link>
            <Link href="/cv" className="label transition-colors hover:text-ink">
              CV
            </Link>
            <Link href="/#contact" className="label transition-colors hover:text-ink">
              CONTACT
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- Pinned, scroll-drawn pipeline ---------- */}
        <section className="pipe-pin grid-paper relative flex h-svh flex-col overflow-hidden px-5 sm:px-8">
          <div className="pipe-intro relative mx-auto w-full max-w-[1440px] pt-24 sm:pt-28">
            <p className="label label-signal">AIRMED HBYS — HOW IT&apos;S BUILT</p>
            <h1 className="display mt-2 text-3xl leading-[0.95] sm:text-5xl">
              One feature&apos;s journey to production.
            </h1>
          </div>

          <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-6 sm:gap-12 lg:grid-cols-[280px_1fr]">
            {/* rail */}
            <div className="rail relative hidden pl-7 lg:block">
              <div className="absolute bottom-2 left-2 top-2 w-px bg-line" />
              <div className="rail-fill absolute left-2 top-2 w-px bg-signal" style={{ height: 0 }} />
              {STAGES.map((s) => (
                <div key={s.rail} className="rail-step relative py-3">
                  <span className="rail-dot absolute -left-5 top-1/2 h-2 w-2 -translate-y-1/2 border border-line-2 bg-paper transition-all duration-300" />
                  <span className="label transition-colors duration-300">{s.rail}</span>
                </div>
              ))}
            </div>

            {/* stages — each with its own scroll-drawn diagram */}
            <div className="relative min-h-[440px] w-full">
              {STAGES.map((s, i) => {
                const Diagram = DIAGRAMS[i];
                return (
                  <div key={s.rail} className="stage absolute inset-0 flex flex-col justify-center gap-4">
                    <p className="label label-signal lg:hidden">{s.rail}</p>
                    <h2 className="display max-w-2xl text-2xl leading-[0.98] sm:text-4xl">{s.title}</h2>
                    <p className="max-w-xl text-sm leading-relaxed text-ink-dim sm:text-[15px]">{s.body}</p>
                    <div className="mt-2 h-[300px] w-full sm:h-[360px]">
                      <Diagram register={(tl) => (timelines.current[i] = tl)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* progress */}
          <div className="relative mx-auto w-full max-w-[1440px] pb-6">
            <div className="h-px overflow-hidden bg-line">
              <div className="bar-fill h-full bg-signal" style={{ width: 0 }} />
            </div>
            <div className="mt-2.5 flex justify-between">
              <span className="label">SCROLL TO ADVANCE</span>
              <span className="stage-counter label">STEP 1 / 7</span>
            </div>
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
              <Link href="/" className="label underline-offset-4 transition-colors hover:text-ink hover:underline">
                ← BACK TO WORK
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
