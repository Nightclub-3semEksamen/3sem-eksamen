"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DesktopEvent = {
  id: number;
  slug: string;
  title: string;
  image: string;
  alt: string;
  formattedDate: string;
};

type FeaturedDesktopSliderProps = {
  events: DesktopEvent[];
};

export default function FeaturedDesktopSlider({
  events,
}: FeaturedDesktopSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const visibleEvents = useMemo(() => {
    if (events.length <= 2) return events;

    return [events[activeIndex], events[(activeIndex + 1) % events.length]];
  }, [events, activeIndex]);

  useEffect(() => {
    if (isPaused || events.length <= 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = currentIndex + 2;

        if (nextIndex >= events.length) {
          return 0;
        }

        return nextIndex;
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, [events.length, isPaused]);

  return (
    <div
      className="mx-auto mt-12 hidden max-w-[950px] grid-cols-1 gap-8 md:grid md:max-w-[1050px] md:grid-cols-2 md:gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      {visibleEvents.map((event) => (
        <Link
          key={`${event.id}-${activeIndex}`}
          href={`/events/${event.slug}`}
          className="group block overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
        >
          <div className="h-[360px] overflow-hidden">
            <img
              src={event.image}
              alt={event.alt}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex min-h-[54px] items-center justify-between gap-4 bg-[oklch(0.52_0.22_5)] px-6 text-white">
            <h3 className="text-base font-bold">{event.title}</h3>

            <p className="shrink-0 text-sm font-medium">
              {event.formattedDate}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}