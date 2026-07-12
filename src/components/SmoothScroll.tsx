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
  // The router writes its own scroll offset back after we run, so the reset is
  // repeated on the next frame and once more after the router has settled.
  useEffect(() => {
    const hash = window.location.hash;
    ScrollTrigger.clearScrollMemory();

    const toAnchor = () => {
      const target = hash && document.querySelector(hash);
      if (!target) return false;
      // Lenis ignores scroll-margin, so the fixed header is cleared by hand;
      // without it a cross-page /#studio lands with its title block underneath.
      if (lenis.current) lenis.current.scrollTo(target as HTMLElement, { immediate: true, offset: -64 });
      else (target as HTMLElement).scrollIntoView();
      return true;
    };

    const toTop = () => {
      lenis.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };

    const settle = () => {
      if (!toAnchor()) toTop();
      ScrollTrigger.refresh(true);
    };

    settle();
    const raf = requestAnimationFrame(settle);
    const timer = window.setTimeout(settle, 120);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
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
