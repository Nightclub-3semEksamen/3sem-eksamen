"use client";

import Link from "next/link";
import { useState } from "react";

type FeaturedEvent = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  time: string;
  location: string;
  image: string;
  alt: string;
};

type FeaturedDesktopSliderProps = {
  events: FeaturedEvent[];
};

export default function FeaturedDesktopSlider({
  events,
}: FeaturedDesktopSliderProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="mx-auto mt-12 hidden max-w-[950px] grid-cols-1 gap-8 md:grid md:max-w-[1050px] md:grid-cols-2 md:gap-6">
      {events.map((event) => {
        const isHovered = hoveredId === event.id;

        return (
          <article
            key={event.id}
            onMouseEnter={() => setHoveredId(event.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(event.id)}
            onBlur={() => setHoveredId(null)}
            className="relative overflow-hidden bg-black text-white"
          >
            <div className="relative h-[360px] overflow-hidden">
              <img
                src={event.image}
                alt={event.alt}
                className="h-full w-full object-cover"
                style={{
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  transition: "transform 700ms ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isHovered
                    ? "rgba(0, 0, 0, 0.72)"
                    : "rgba(0, 0, 0, 0)",
                  transition: "background 700ms ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "28px",
                  right: "28px",
                  bottom: "28px",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity 700ms ease, transform 700ms ease",
                  pointerEvents: isHovered ? "auto" : "none",
                }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[oklch(0.65_0.25_8)]">
                  {event.location} · {event.time}
                </p>

                <p className="mt-4 max-h-[76px] overflow-hidden text-sm font-medium leading-relaxed text-white">
                  {event.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-5">
                  <Link
                    href={`/events/${event.slug}`}
                    className="text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
                  >
                    Read More
                  </Link>

                  <Link
                    href={`/book-table?eventId=${event.id}`}
                    className="border-y-2 border-white px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex min-h-[54px] items-center justify-between gap-4 bg-[oklch(0.52_0.22_5)] px-6 text-white">
              <h3 className="text-base font-bold">{event.title}</h3>

              <p className="shrink-0 text-sm font-medium">{event.date}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}