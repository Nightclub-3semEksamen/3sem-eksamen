"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type MobileEvent = {
  id: number;
  slug: string;
  title: string;
  date: string;
  location: string;
  image: string;
  alt: string;
};

type FeaturedMobileCarouselProps = {
  events: MobileEvent[];
};

function formatMobileDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();

  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });

  return `${day} ${month}`;
}

function formatMobileTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="block min-w-full snap-center overflow-hidden bg-black"
          >
            <div className="h-[450px] overflow-hidden">
              <img
                src={event.image}
                alt={event.alt}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid min-h-[64px] grid-cols-3 items-center bg-[oklch(0.65_0.25_8)] px-4 text-center text-white">
              <p className="text-xl font-bold">
                {formatMobileDate(event.date)}
              </p>

              <p className="text-xl font-bold">
                {formatMobileTime(event.date)}
              </p>

              <p className="text-xl font-bold leading-tight">
                {event.location}
              </p>
            </div>
          </Link>
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