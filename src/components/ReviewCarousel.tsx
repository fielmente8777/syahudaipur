"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Review = { quote: string; byline: string };

const ADVANCE_MS = 6500;
const SWIPE_PX = 40;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  const count = reviews.length;
  const show = (n: number) => setIndex(((n % count) + count) % count);

  // Auto-advance; restarts whenever the slide changes, so a manual pick gets a full interval.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduceMotion, count]);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Traveller reviews from Tripadvisor"
      className="flex flex-col gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > SWIPE_PX) show(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="rv-stage">
        {reviews.map((review, k) => (
          <figure
            key={review.byline}
            className={`rv-slide${k === index ? " on" : ""}`}
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${count}`}
            aria-hidden={k !== index}
          >
            <blockquote className="m-0 max-w-[940px] font-serif text-[clamp(30px,3.8vw,52px)] leading-[1.16] text-ivory italic">
              “{review.quote}”
            </blockquote>
            <figcaption className="text-[14px] text-caption">{review.byline}</figcaption>
          </figure>
        ))}
      </div>
      <div className="flex items-center gap-[18px]">
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose a review">
          {reviews.map((review, k) => (
            <button
              key={review.byline}
              type="button"
              className="rv-dot"
              aria-label={`Review ${k + 1} of ${count}`}
              aria-current={k === index}
              onClick={() => show(k)}
            >
              <span />
            </button>
          ))}
        </div>
        <span className="text-[13px] tracking-[0.14em] whitespace-nowrap text-caption">
          {pad(index + 1)} / {pad(count)}
        </span>
      </div>
    </div>
  );
}
