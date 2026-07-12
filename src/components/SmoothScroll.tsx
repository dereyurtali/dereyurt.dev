'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  // Next restores the previous scroll offset on a back navigation, which lands the
  // new page half-way down with every ScrollTrigger still measured against the old
  // layout. We take scroll restoration over ourselves instead.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // dekoratif videolar da hareket etmesin
      document.querySelectorAll('video').forEach((v) => {
        v.pause();
        v.removeAttribute('autoplay');
      });
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.current = instance;

    instance.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts and videos change layout after first paint; remeasure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // On every route change: land at the top (or the requested anchor), drop any
  // remembered scroll position, then let ScrollTrigger remeasure the new page.
  //
  // One pass is not enough. The router writes its own scroll offset back after we
  // run, and fonts and video posters keep changing the layout for a few hundred ms
  // after that — a /cv → /#studio jump measured once landed a thousand pixels short.
  // So we re-land until the page stops moving, and give up the moment the visitor
  // touches the scroll themselves, so we never yank them back.
  useEffect(() => {
    const hash = window.location.hash;
    ScrollTrigger.clearScrollMemory();

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    const land = () => {
      if (cancelled) return;
      // The fixed header is cleared by the section's own scroll-margin, which Lenis
      // honours — an offset here on top of it lands the section twice as low.
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (target) {
        if (lenis.current) lenis.current.scrollTo(target, { immediate: true });
        else target.scrollIntoView();
      } else {
        lenis.current?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh(true);
    };

    window.addEventListener('wheel', cancel, { passive: true, once: true });
    window.addEventListener('touchstart', cancel, { passive: true, once: true });
    window.addEventListener('keydown', cancel, { once: true });

    land();
    const raf = requestAnimationFrame(land);
    const timers = [120, 350, 700, 1100].map((t) => window.setTimeout(land, t));
    document.fonts.ready.then(land);

    return () => {
      cancel();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, [pathname]);

  // Back/forward: the browser (or a restored bfcache page) may hand us a stale offset.
  useEffect(() => {
    const reset = () => {
      lenis.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh(true);
    };
    const onPop = () => requestAnimationFrame(reset);
    const onPageShow = (e: PageTransitionEvent) => e.persisted && reset();

    window.addEventListener('popstate', onPop);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return <>{children}</>;
}
