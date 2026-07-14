'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * The clinic's n8n workflows as clickable drawings, sitting inside the
 * Clinic AI Automation work row. Thumbnails open a full-screen viewer with
 * keyboard arrows / ESC. Two drawings are redrawn from the live workflows,
 * two illustrate the reminder and document pipelines — none are canvas
 * exports, and no endpoint, credential or prompt text appears in them.
 */

const FLOWS = [
  {
    src: '/clinic/flow-responder.svg',
    title: 'WHATSAPP AI RESPONDER',
    note: 'Redrawn from the live workflow — text, voice and image messages answered and booked 7/24.',
  },
  {
    src: '/clinic/flow-ehr-sync.svg',
    title: 'EHR APPOINTMENT SYNC',
    note: 'Redrawn from the live workflow — bookings flow into the clinic EHR without re-typing.',
  },
  {
    src: '/clinic/flow-reminders.svg',
    title: 'PATIENT REMINDERS',
    note: 'Day-before confirmations in the patient’s language; silence becomes a reception call list.',
  },
  {
    src: '/clinic/flow-documents.svg',
    title: 'DOCUMENT INTAKE',
    note: 'Patient-sent files read by vision models and filed to the chart only after an identity match.',
  },
];

export default function ClinicFlows() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + FLOWS.length) % FLOWS.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, step]);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {FLOWS.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group/flow border border-line bg-card text-left transition-colors hover:border-signal"
          >
            <span className="block overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.src}
                alt={`n8n workflow — ${f.title.toLowerCase()}`}
                loading="lazy"
                decoding="async"
                className="aspect-[9/5] w-full object-cover transition-transform duration-500 group-hover/flow:scale-[1.03]"
              />
            </span>
            <span className="label flex items-center justify-between border-t border-line px-3 py-2 transition-colors group-hover/flow:text-signal">
              {f.title}
              <span aria-hidden>⤢</span>
            </span>
          </button>
        ))}
      </div>

      {/* portal: an ancestor work-row keeps a GSAP transform, which would turn
          position:fixed into position:relative-to-the-row */}
      {open !== null &&
        createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={FLOWS[open].title}
          onClick={() => setOpen(null)}
        >
          <div
            className="flex max-h-full w-full max-w-6xl flex-col border border-line bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-5">
              <span className="label label-signal min-w-0 truncate">
                FIG 10.{open + 1} — {FLOWS[open].title}
              </span>
              <div className="flex shrink-0 items-center gap-4">
                <button type="button" onClick={() => step(-1)} className="label label-link hover:text-signal" aria-label="Previous workflow">
                  ←<span className="hidden sm:inline"> PREV</span>
                </button>
                <button type="button" onClick={() => step(1)} className="label label-link hover:text-signal" aria-label="Next workflow">
                  <span className="hidden sm:inline">NEXT </span>→
                </button>
                <button type="button" onClick={() => setOpen(null)} className="label label-link hover:text-signal" aria-label="Close viewer">
                  <span className="hidden sm:inline">CLOSE </span>✕
                </button>
              </div>
            </div>
            {/* phones pan the drawing at a readable size instead of shrinking
                a 1440px canvas into a 350px slot */}
            <div className="min-h-0 flex-1 overflow-auto bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FLOWS[open].src}
                alt={`n8n workflow — ${FLOWS[open].title.toLowerCase()}`}
                className="h-auto min-w-[860px] max-w-none sm:h-full sm:max-h-[70vh] sm:w-full sm:min-w-0 sm:max-w-full sm:object-contain"
              />
            </div>
            <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-ink-dim sm:px-5">
              {FLOWS[open].note}{' '}
              <span className="text-ink-faint">
                Stylized redraw — node roles and order are real, everything sensitive is not in the drawing.
              </span>
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
