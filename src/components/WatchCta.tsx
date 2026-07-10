import Link from 'next/link';

/**
 * Primary call to action for the AirMed panel.
 * The button carries a miniature of the thing it opens: a seven-stop rail with a
 * pulse walking it, so the promise ("an animated walkthrough") is visible before
 * the click rather than only described.
 */
export default function WatchCta() {
  const STOPS = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Link href="/airmed" className="cta group block max-w-lg border border-ink bg-card">
      <span className="flex items-stretch">
        <span className="flex-1 px-6 py-5">
          <span className="flex items-baseline gap-3">
            <span className="cta-play text-signal">▶</span>
            <span className="font-mono text-[13px] tracking-[0.16em] text-ink">
              WATCH HOW IT&apos;S BUILT
            </span>
          </span>

          {/* the walkthrough, in miniature */}
          <span className="mt-4 flex items-center gap-4">
            <svg viewBox="0 0 168 12" className="cta-rail h-3 w-[168px] shrink-0" aria-hidden>
              <line x1="4" y1="6" x2="164" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.35" />
              {STOPS.map((i) => (
                <circle key={i} cx={4 + i * 26.6} cy="6" r="2.4" fill="currentColor" opacity="0.35" />
              ))}
              <circle className="cta-pulse" cx="4" cy="6" r="4" />
            </svg>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-faint">
              7 STEPS · 2 MIN
            </span>
          </span>
        </span>

        <span className="flex w-16 items-center justify-center border-l border-ink text-xl leading-none">
          <span className="cta-arrow">→</span>
        </span>
      </span>
    </Link>
  );
}
