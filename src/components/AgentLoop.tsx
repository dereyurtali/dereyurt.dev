'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animation';

gsap.registerPlugin(useGSAP);

/**
 * The hero's proof: a real agentic turn, running by itself.
 *
 * Rather than claiming "LLM integration", the page shows one — a patient message
 * classified, scrubbed, checked against the tenant policy, turned into a tool call
 * and a row-level-secured transaction, and answered. The second scenario is the
 * one that matters to anyone hiring for this: a request that the guardrail refuses.
 *
 * Two rules from the rest of the site hold here: the animation is ambient (it runs
 * on its own, nothing is scrubbed by scroll), and it is code-native, not a video.
 */

type Tone = 'in' | 'step' | 'deny' | 'out';
type Line = { k: string; v: string; tone: Tone; wait?: boolean };

const SCENARIOS: { channel: string; lines: Line[]; stat: string }[] = [
  {
    channel: 'WHATSAPP · TR',
    lines: [
      { k: 'IN', v: '"yarın 14:00\'e alabilir miyiz?"', tone: 'in' },
      { k: 'INTENT', v: 'reschedule_appointment · 0.97', tone: 'step' },
      { k: 'GUARD', v: 'pii scrubbed · tenant = clinic_04', tone: 'step' },
      { k: 'TOOL', v: 'slots.find({ doctor, thu }) → 3 open', tone: 'step', wait: true },
      { k: 'TX', v: 'BEGIN · SET rls · UPDATE · COMMIT', tone: 'step' },
      { k: 'OUT', v: '"Perşembe 14:00 onaylandı ✓"', tone: 'out' },
    ],
    stat: '1.4 s · 2 tool calls · 0 rows outside the tenant',
  },
  {
    channel: 'TELEGRAM · EN',
    lines: [
      { k: 'IN', v: '"send me Mehmet\'s test results"', tone: 'in' },
      { k: 'INTENT', v: 'fetch_records · 0.93', tone: 'step' },
      { k: 'GUARD', v: 'cross-patient read · DENIED by policy', tone: 'deny', wait: true },
      { k: 'TOOL', v: 'never called', tone: 'step' },
      { k: 'OUT', v: '"I can only share your own records."', tone: 'out' },
    ],
    stat: '0.6 s · 0 tool calls · 0 rows leaked',
  },
];

const ROWS = Math.max(...SCENARIOS.map((s) => s.lines.length));
const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const TONE_CLASS: Record<Tone, string> = {
  in: 'text-ink',
  step: 'text-ink-dim',
  deny: 'text-red',
  out: 'text-ink',
};

export default function AgentLoop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Nothing types itself; the first scenario is simply there, finished.
        const s = SCENARIOS[0];
        el.querySelector<HTMLElement>('.al-channel')!.textContent = s.channel;
        el.querySelector<HTMLElement>('.al-stat')!.textContent = s.stat;
        s.lines.forEach((ln, i) => {
          const row = el.querySelectorAll<HTMLElement>('.al-row')[i];
          row.style.visibility = 'visible';
          row.querySelector<HTMLElement>('.al-k')!.textContent = ln.k;
          const v = row.querySelector<HTMLElement>('.al-v')!;
          v.textContent = ln.v;
          v.className = `al-v ${TONE_CLASS[ln.tone]}`;
        });
        return;
      }

      const rows = gsap.utils.toArray<HTMLElement>('.al-row', el);
      const channel = el.querySelector<HTMLElement>('.al-channel')!;
      const stat = el.querySelector<HTMLElement>('.al-stat')!;
      const caret = el.querySelector<HTMLElement>('.al-caret')!;

      // the caret never stops blinking, even between scenarios
      gsap.to(caret, { opacity: 0.15, duration: 0.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.al-dot', { opacity: 0.25, duration: 0.9, repeat: -1, yoyo: true, ease: 'power1.inOut' });

      /** Types `text` into `el` one character at a time. */
      const type = (target: HTMLElement, text: string) => {
        const o = { n: 0 };
        return gsap.to(o, {
          n: text.length,
          duration: Math.max(0.22, text.length * 0.013),
          ease: 'none',
          onUpdate: () => {
            target.textContent = text.slice(0, Math.round(o.n));
          },
        });
      };

      /** The tool call and the guard take a beat — the loop is doing work. */
      const spin = (target: HTMLElement) => {
        const o = { i: 0 };
        return gsap.to(o, {
          i: SPINNER.length * 3,
          duration: 0.7,
          ease: 'none',
          onUpdate: () => {
            target.textContent = SPINNER[Math.round(o.i) % SPINNER.length];
          },
          onComplete: () => {
            target.textContent = '';
          },
        });
      };

      const master = gsap.timeline({ repeat: -1 });

      SCENARIOS.forEach((s) => {
        const tl = gsap.timeline();

        tl.set(rows, { visibility: 'hidden' })
          .call(() => {
            rows.forEach((r) => {
              r.querySelector<HTMLElement>('.al-k')!.textContent = '';
              r.querySelector<HTMLElement>('.al-v')!.textContent = '';
              r.querySelector<HTMLElement>('.al-spin')!.textContent = '';
            });
            stat.textContent = '';
          })
          .add(type(channel, s.channel));

        s.lines.forEach((ln, i) => {
          const row = rows[i];
          const k = row.querySelector<HTMLElement>('.al-k')!;
          const v = row.querySelector<HTMLElement>('.al-v')!;
          const sp = row.querySelector<HTMLElement>('.al-spin')!;

          tl.set(row, { visibility: 'visible' })
            .call(() => {
              v.className = `al-v ${TONE_CLASS[ln.tone]}`;
              caret.parentElement !== v.parentElement && v.parentElement!.appendChild(caret);
            })
            .add(type(k, ln.k))
            .add(type(v, ln.v), '>-0.05')
            .add(ln.wait ? spin(sp) : gsap.to({}, { duration: 0.12 }));
        });

        // the closing line is the point: what the run did NOT do
        tl.add(type(stat, s.stat), '+=0.15').to({}, { duration: 2.6 });

        master.add(tl);
      });

      // A hero animation nobody is looking at is wasted battery.
      const io = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? master.play() : master.pause()),
        { threshold: 0 }
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="agent-loop card relative min-w-0 border-line">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <p className="label flex items-center gap-2">
          <span className="al-dot inline-block h-1.5 w-1.5 bg-signal" aria-hidden />
          AGENT LOOP
        </p>
        <p className="label al-channel text-signal" aria-hidden />
      </div>

      <div className="space-y-2 px-4 py-5 font-mono text-[11px] leading-relaxed sm:text-[12.5px]" aria-hidden>
        {Array.from({ length: ROWS }, (_, i) => (
          <div key={i} className="al-row invisible grid grid-cols-[3.6rem_1fr] gap-2 sm:grid-cols-[4.2rem_1fr]">
            <span className="al-k shrink-0 tracking-[0.1em] text-ink-faint" />
            <span className="min-w-0 break-words">
              <span className="al-v text-ink-dim" />
              <span className="al-spin ml-1 text-signal" />
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <span className="al-stat font-mono text-[10px] leading-relaxed tracking-[0.06em] text-green sm:text-[11px]" aria-hidden />
        <span className="al-caret inline-block h-3 w-[7px] shrink-0 bg-signal" aria-hidden />
      </div>

      {/* the trace is decorative motion; this is what it says */}
      <p className="sr-only">
        A live trace of the LLM assistant I built for a hospital information system: a patient
        message on WhatsApp is classified, scrubbed of personal data, checked against the tenant
        policy, turned into a tool call and a row-level-secured transaction, and answered — and a
        request for another patient&apos;s records is refused by the policy before any tool runs.
      </p>
    </div>
  );
}
