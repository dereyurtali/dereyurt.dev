'use client';

import { ReactNode, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, splitLines, EASE_OUT } from '@/lib/animation';
import SiteHeader, { HOME_NAV } from '@/components/SiteHeader';

gsap.registerPlugin(useGSAP);

/**
 * Shared chrome for the project sub-pages: drawing-frame nav, title block hero,
 * scroll reveals for anything marked [data-reveal] / [data-split] / [data-rule].
 */
export default function SubpageShell({
  dwg,
  eyebrow,
  title,
  meta,
  lede,
  actions,
  children,
}: {
  dwg: string;
  eyebrow: string;
  title: ReactNode;
  meta: string;
  lede: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const ctx = root.current!;

      // ScrollTrigger'lar GSAP context'i içinde doğsun; aksi halde rota değişiminde
      // temizlenmeyip eski ölçülerle sayfada kalıyorlar.
      const build = contextSafe!(() => {
        const heroTitle = ctx.querySelector('.sp-title')!;
        const split = splitLines(heroTitle);
        gsap.set(heroTitle, { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: EASE_OUT } })
          .from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.08, delay: 0.1 })
          .from('.sp-block', { autoAlpha: 0, y: 12, duration: 0.7 }, '-=0.8')
          .from('.sp-lede', { autoAlpha: 0, y: 16, duration: 0.8 }, '-=0.6')
          .from('.sp-actions', { autoAlpha: 0, y: 12, duration: 0.6 }, '-=0.5');

        ctx.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 32,
            duration: 0.9,
            ease: EASE_OUT,
            scrollTrigger: { trigger: el, start: 'top 94%' },
          });
        });

        ctx.querySelectorAll<HTMLElement>('[data-rule]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          });
        });

        ctx.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
          const s = splitLines(el);
          gsap.set(el, { autoAlpha: 1 });
          gsap.from(s.lines, {
            yPercent: 110,
            duration: 1,
            stagger: 0.07,
            ease: EASE_OUT,
            scrollTrigger: { trigger: el, start: 'top 86%' },
          });
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
      <SiteHeader items={HOME_NAV} />

      <main>
        {/* hero */}
        <section className="grid-paper border-b border-line px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="title-block sp-block mb-10 max-w-3xl">
              <span className="label label-signal">{dwg}</span>
              <span className="label">{eyebrow}</span>
            </div>

            <h1 className="sp-title display display-xl invisible max-w-[16ch] text-[13vw] leading-[0.9] sm:text-[8.4vw] lg:text-[7vw]">
              {title}
            </h1>

            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <p className="sp-lede max-w-[68ch] text-base leading-relaxed text-ink-dim lg:col-span-6">{lede}</p>
              <div className="sp-lede lg:col-span-4 lg:col-start-9">
                <div className="dim mb-4" />
                <p className="label leading-relaxed">{meta}</p>
              </div>
            </div>

            {actions && <div className="sp-actions mt-12 flex flex-wrap items-center gap-5">{actions}</div>}
          </div>
        </section>

        {children}

        {/* footer */}
        <footer className="border-t border-line px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6">
            <Link href="/#work" className="label label-link underline-offset-4 transition-colors hover:text-signal hover:underline">
              ← BACK TO WORK
            </Link>
            <div className="flex flex-wrap gap-8">
              <a href="mailto:ali@dereyurt.dev" className="label label-link transition-colors hover:text-signal">
                ALI@DEREYURT.DEV
              </a>
              <a href="https://github.com/dereyurtali" target="_blank" rel="noopener noreferrer" className="label label-link transition-colors hover:text-signal">
                GITHUB ↗
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ---------- shared section furniture ---------- */

export function Section({
  dwg,
  title,
  children,
  band,
}: {
  dwg: string;
  title: string;
  children: ReactNode;
  band?: boolean;
}) {
  return (
    <section className={`px-5 py-20 sm:px-8 sm:py-28 ${band ? 'border-y border-line bg-paper-2' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <div className="title-block mb-12" data-reveal>
          <span className="label label-signal">{dwg}</span>
          <span className="label">{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card p-6">
      <p className="display text-4xl leading-none text-signal sm:text-5xl">{value}</p>
      <p className="label mt-3">{label}</p>
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
      {children}
    </div>
  );
}

export function Spec({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6" data-reveal>
      <p className="label label-signal mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i} className="text-sm leading-relaxed text-ink-dim">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BtnLink({ href, children, download }: { href: string; children: ReactNode; download?: boolean }) {
  return (
    <a
      href={href}
      {...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
      className="group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 font-mono text-xs tracking-[0.14em] text-paper transition-colors hover:border-signal hover:bg-signal"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}
