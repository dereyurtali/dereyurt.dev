import Link from 'next/link';

type Item = { href: string; label: string; short?: string };

/**
 * One header for every page. On narrow screens the wordmark and the four labels
 * did not fit on one line — the nav wrapped and "CONTACT" ran off the edge — so
 * the tracking tightens, "HOW I BUILD" shortens to "BUILD", and every link keeps
 * a 44px tall hit area even though the type is 11px.
 */
export default function SiteHeader({ items }: { items: Item[] }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8">
        <Link
          href="/"
          className="label label-signal -my-2 flex min-h-11 shrink-0 items-center whitespace-nowrap py-2 tracking-[0.1em] sm:tracking-[0.2em]"
        >
          ALI DEREYURT
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8 lg:gap-10">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="label -my-2 flex min-h-11 items-center whitespace-nowrap py-2 tracking-[0.1em] transition-colors hover:text-ink sm:tracking-[0.2em]"
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
  { href: '/airmed', label: 'HOW I BUILD', short: 'BUILD' },
  { href: '/cv', label: 'CV' },
  { href: '/#contact', label: 'CONTACT' },
];
