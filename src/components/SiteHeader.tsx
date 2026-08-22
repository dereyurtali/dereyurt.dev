import Link from 'next/link';

type Item = { href: string; label: string; short?: string };

/**
 * One header for every page. Five labels plus the wordmark do not fit across a
 * 360px phone at the desktop tracking, so below sm the letter-spacing collapses,
 * the gaps tighten and "HOW I BUILD" shortens to "BUILD". Every link still keeps
 * a 44px tall hit area even though the type is 11px.
 */
export default function SiteHeader({ items }: { items: Item[] }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-8">
        <Link
          href="/"
          className="label nav-label label-signal -my-2 flex min-h-11 shrink-0 items-center whitespace-nowrap py-2"
        >
          ALI DEREYURT
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-6 lg:gap-10">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="label nav-label -my-2 flex min-h-11 items-center whitespace-nowrap py-2 transition-colors hover:text-ink"
            >
              {i.short ? (
                <>
                  <span className="sm:hidden">{i.short}</span>
                  <span className="hidden sm:inline">{i.label}</span>
                </>
              ) : (
                i.label
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export const HOME_NAV: Item[] = [
  { href: '/#work', label: 'WORK' },
  { href: '/research', label: 'RESEARCH', short: 'RES.' },
  { href: '/#embedded', label: 'EMBEDDED', short: 'EMB.' },
  { href: '/cv', label: 'CV' },
  { href: '/#contact', label: 'CONTACT' },
];
