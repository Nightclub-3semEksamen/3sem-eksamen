"use client";

import Link from "next/link";
import { useRef, useState } from "react";

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

type FeaturedMobileCarouselProps = {
  events: FeaturedEvent[];
};

export default function FeaturedMobileCarousel({
  events,
}: FeaturedMobileCarouselProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const slider = sliderRef.current;

    if (!slider) return;

    const cardWidth = slider.clientWidth;
    const index = Math.round(slider.scrollLeft / cardWidth);

    setActiveIndex(index);
  }

  function scrollToEvent(index: number) {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollTo({
      left: slider.clientWidth * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  return (
    <div className="mt-12 md:hidden">
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((event) => (
          <article
            key={event.id}
            className="min-w-full snap-center overflow-hidden bg-black text-white"
          >
            <Link
              href={`/events/${event.slug}`}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
            >
              <div className="h-[450px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>

            <div className="bg-[oklch(0.65_0.25_8)] px-5 py-5 text-white">
              <div className="grid grid-cols-3 items-center gap-3 text-center">
                <p className="text-lg font-bold">{event.date}</p>

                <p className="text-lg font-bold">{event.time}</p>

                <p className="text-lg font-bold leading-tight">
                  {event.location}
                </p>
              </div>

              <h3 className="mt-5 text-center text-xl font-bold uppercase tracking-[0.06em]">
                {event.title}
              </h3>

              <p className="mx-auto mt-3 max-h-[82px] max-w-[320px] overflow-hidden text-center text-sm font-medium leading-relaxed">
                {event.excerpt}
              </p>

              <div className="mt-5 flex justify-center gap-5">
                <Link
                  href={`/events/${event.slug}`}
                  className="text-sm font-bold uppercase tracking-[0.08em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Read More
                </Link>

                <Link
                  href={`/book-table?eventId=${event.id}`}
                  className="border-y-2 border-white px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] transition hover:border-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-5">
        {events.map((event, index) => (
          <button
            key={event.id}
            type="button"
            aria-label={`Go to event ${index + 1}`}
            onClick={() => scrollToEvent(index)}
            className={`h-8 w-8 transition ${
              activeIndex === index
                ? "bg-[oklch(0.65_0.25_8)]"
                : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}