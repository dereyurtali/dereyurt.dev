'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/animation';
import { lenisScrollTo } from '@/components/SmoothScroll';

/**
 * The product, page by page: stylized recreations of the AirMed screens
 * cycling in a drawing-frame on the left, one short sentence per page on the
 * right — what each does, never how. The order follows a real session (sign
 * in → roles → permissions → the working day), and every SVG carries its own
 * small looping animation so the frame is alive between changes.
 *
 * On a desktop the section pins and the SCROLL walks through the pages — the
 * same speed-capped chaser as the pipeline above, so a fast fling still shows
 * every page in order at a readable pace. A click on a row scrolls to that
 * page's segment. On touch (no pinning) the pages advance on their own
 * timers; with reduced motion nothing auto-advances — the rows are a picker.
 *
 * These are deliberately NOT real screenshots: layouts are redrawn, all data
 * is invented, and nothing proprietary — logic, vendors, internals — appears.
 */

const SHOTS = [
  {
    src: '/airmed/shot-login.svg',
    title: 'SIGN-IN',
    caption: 'No session without a password and a one-time code.',
    hold: 3600,
  },
  {
    src: '/airmed/shot-roles.svg',
    title: 'USERS & ROLES',
    caption: 'Ten clinic roles — everyone sees only the screens their job needs.',
    hold: 4400,
  },
  {
    src: '/airmed/shot-permissions.svg',
    title: 'PERMISSIONS',
    caption: 'Every action is checked server-side against a per-role permission registry.',
    hold: 4800,
  },
  {
    src: '/airmed/shot-dashboard.svg',
    title: 'CLINIC DASHBOARD',
    caption: 'The clinic’s day on one screen — appointments, queues and alerts.',
    hold: 4400,
  },
  {
    src: '/airmed/shot-calendar.svg',
    title: 'SCHEDULING',
    caption: 'Appointments planned across doctors and rooms without collisions.',
    hold: 4400,
  },
  {
    src: '/airmed/shot-patient.svg',
    title: 'PATIENT RECORD',
    caption: 'One patient, one timeline: visits, notes and documents together.',
    hold: 4800,
  },
  {
    src: '/airmed/shot-lab.svg',
    title: 'LAB RESULTS',
    caption: 'Results reach the chart the moment they are reported.',
    hold: 4000,
  },
  {
    src: '/airmed/shot-billing.svg',
    title: 'BILLING',
    caption: 'Invoices and insurance settled at the desk, not in a back office.',
    hold: 4400,
  },
  {
    src: '/airmed/shot-agent.svg',
    title: 'AI FRONT DESK',
    caption: 'Patients write on WhatsApp; the agent answers and books inside its guardrails.',
    hold: 5200,
  },
];

export default function AirmedShots() {
  const [idx, setIdx] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const hovered = useRef(false);

  const reduced = useRef(false);
  const st = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => (inView.current = entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Desktop: the wrapper grows to give the story scroll room and the content
  // holds via CSS sticky — deliberately NOT a second GSAP pin, because two
  // pins on one page can end up fixed at the same time on a hard fling (the
  // pipeline above already owns one). ScrollTrigger only reads progress here,
  // and the same speed-capped chaser walks the pages so nothing gets skipped.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const N = SHOTS.length;
        let target = 0;
        let shown = 0;
        const SPEED = 0.24; // full-run units/s — ≈0.46s a page when flung

        gsap.set(wrap.current, { height: `${N * 55}vh` });

        const tick = (_t: number, deltaMs: number) => {
          const dist = target - shown;
          if (Math.abs(dist) < 0.00001) return;
          const dt = Math.min(deltaMs / 1000, 0.05);
          const v = Math.min(SPEED, Math.max(Math.abs(dist) * 5, 0.03));
          shown += Math.sign(dist) * Math.min(Math.abs(dist), v * dt);
          setIdx(Math.min(N - 1, Math.floor(shown * N)));
        };
        gsap.ticker.add(tick);

        st.current = ScrollTrigger.create({
          trigger: wrap.current,
          start: 'top top+=112',
          end: 'bottom bottom',
          // This trigger is born in a child effect, BEFORE the pipeline pin
          // above exists. GSAP hands out preceding-pin compensation in
          // refresh order (= creation order by default), so without this the
          // start/end here never learn about the pin's ~10-viewport spacer
          // and the pages run while the pipeline is still on screen.
          refreshPriority: -1,
          onUpdate: (self) => {
            target = self.progress;
          },
          onRefresh: (self) => {
            target = self.progress;
            shown = target;
            setIdx(Math.min(N - 1, Math.floor(shown * N)));
          },
        });

        return () => {
          gsap.ticker.remove(tick);
          gsap.set(wrap.current, { clearProps: 'height' });
          st.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: wrap }
  );

  // Touch (no pin): each page holds for its own reading time, then advances;
  // while paused (off-screen, hovered, hidden tab) it re-checks quietly.
  useEffect(() => {
    if (reduced.current) return;
    let t: ReturnType<typeof setTimeout>;
    const arm = (ms: number) => {
      t = setTimeout(() => {
        if (!st.current && inView.current && !hovered.current && !document.hidden) {
          setIdx((i) => (i + 1) % SHOTS.length);
        } else {
          arm(SHOTS[idx].hold);
        }
      }, ms);
    };
    arm(SHOTS[idx].hold);
    return () => clearTimeout(t);
  }, [idx]);

  // A row click: on the pinned desktop layout scroll to that page's segment
  // (the chaser plays the pages between); on touch just show it.
  const goTo = (i: number) => {
    const trigger = st.current;
    if (trigger) {
      const p = (i + 0.5) / SHOTS.length;
      lenisScrollTo(trigger.start + p * (trigger.end - trigger.start));
    } else {
      setIdx(i);
    }
  };

  return (
    // outer div = the scroll room (height set on lg by the effect above);
    // inner div = the visible block, held in place by CSS sticky while the
    // scroll runs the pages
    <div ref={wrap} className="relative">
      <div
        className="grid gap-8 lg:sticky lg:top-28 lg:grid-cols-12 lg:gap-12"
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
      >
      {/* the frame */}
      <figure className="min-w-0 lg:col-span-8">
        <div className="border border-line bg-card">
          <div className="flex items-baseline justify-between border-b border-line px-4 py-2.5 sm:px-5">
            <span className="label label-signal">FIG 08 — AIRMED HBYS</span>
            <span className="label hidden sm:block">{SHOTS[idx].title}</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            {SHOTS.map((s, i) => (
              /* all frames stay mounted and stacked, so a cycle is a pure
                 crossfade with no network hiccup mid-animation */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.src}
                src={s.src}
                alt={i === idx ? `AirMed HBYS — ${s.title.toLowerCase()}` : ''}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-out ${
                  i === idx ? 'scale-100 opacity-100' : 'scale-[1.015] opacity-0'
                }`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </div>
        <figcaption className="label mt-3 text-ink-faint">
          STYLIZED RECREATION · INVENTED DEMO DATA — THE REAL SYSTEM AND ITS RECORDS STAY PRIVATE
        </figcaption>
      </figure>

      {/* the pages, one sentence each */}
      <div className="min-w-0 self-center lg:col-span-4" role="tablist" aria-label="AirMed pages">
        {SHOTS.map((s, i) => {
          const active = i === idx;
          return (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => goTo(i)}
              className={`group block w-full border-l py-3 pl-5 text-left transition-colors duration-300 ${
                active ? 'border-signal' : 'border-line hover:border-line-2'
              }`}
            >
              <span className="flex items-baseline gap-3">
                <span className={`label transition-colors duration-300 ${active ? 'text-signal' : 'text-ink-faint'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`label transition-colors duration-300 ${active ? 'text-ink' : 'text-ink-faint group-hover:text-ink-dim'}`}>
                  {s.title}
                </span>
              </span>
              {/* the one-sentence description, only for the page on screen */}
              <span
                className={`block max-w-[38ch] overflow-hidden text-sm leading-relaxed text-ink-dim transition-all duration-500 ${
                  active ? 'mt-1.5 max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {s.caption}
              </span>
            </button>
          );
        })}
      </div>
      </div>
    </div>
  );
}
