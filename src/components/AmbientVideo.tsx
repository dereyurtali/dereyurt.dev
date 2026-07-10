'use client';

import { useEffect, useRef } from 'react';

/**
 * A decorative, muted background clip.
 *
 * The source is not attached until the element is close to the viewport, so the
 * bytes are only spent by visitors who actually scroll there. A poster frame
 * stands in until then, which also gives us something to paint if the video
 * never loads. Nothing moves when the visitor asks for reduced motion.
 */
export default function AmbientVideo({
  src,
  poster,
  className,
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  /** Above the fold: attach the source immediately instead of waiting for scroll. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const attach = () => {
      if (video.dataset.loaded) return;
      video.dataset.loaded = 'true';
      video.src = src;
      video.load();
      video.play().catch(() => {
        /* autoplay refused — the poster stays, which is fine */
      });
    };

    if (eager) {
      attach();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          attach();
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src, eager]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    />
  );
}
