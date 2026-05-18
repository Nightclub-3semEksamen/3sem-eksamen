"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaSnapchatGhost } from "react-icons/fa";

type Testimonial = {
  id: number;
  name: string;
  content: string;
  facebook: string;
  twitter: string;
  image: string;
  asset: {
    alt: string;
  };
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const activeTestimonial = testimonials[activeIndex];

  function goToNextTestimonial() {
    setActiveIndex((currentIndex) =>
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function goToPreviousTestimonial() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    );
  }

  function handleTouchEnd(touchEnd: number) {
    if (touchStart === null) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      goToNextTestimonial();
    }

    if (distance < -50) {
      goToPreviousTestimonial();
    }

    setTouchStart(null);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToNextTestimonial}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          goToNextTestimonial();
        }
      }}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      className="mx-auto flex max-w-4xl cursor-pointer flex-col items-center text-center outline-none"
    >
      <img
        src={activeTestimonial.image}
        alt={activeTestimonial.asset.alt}
        className="h-[170px] w-[170px] object-cover"
      />

      <h2 className="mt-8 text-2xl font-bold uppercase tracking-[0.12em] text-white drop-shadow-lg">
        {activeTestimonial.name}
      </h2>

      <p
        style={{ maxWidth: "860px" }}
        className="mt-5 text-sm font-medium leading-7 text-white drop-shadow-lg md:text-base"
      >
        {activeTestimonial.content}
      </p>

      <div
        className="mt-8 flex justify-center gap-5"
        onClick={(event) => event.stopPropagation()}
      >
        <a
          href={activeTestimonial.facebook}
          aria-label={`${activeTestimonial.name} Facebook`}
          className="flex h-10 w-10 items-center justify-center border-2 border-white text-lg text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)]"
        >
          <FaFacebookF />
        </a>

        <a
          href={activeTestimonial.twitter}
          aria-label={`${activeTestimonial.name} Twitter`}
          className="flex h-10 w-10 items-center justify-center border-2 border-white text-lg text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)]"
        >
          <FaTwitter />
        </a>

        <a
          href="#"
          aria-label={`${activeTestimonial.name} Snapchat`}
          className="flex h-10 w-10 items-center justify-center border-2 border-white text-lg text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)]"
        >
          <FaSnapchatGhost />
        </a>
      </div>

      <div
        className="mt-12 flex justify-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            type="button"
            aria-label={`Show testimonial ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-5 w-5 cursor-pointer transition duration-300 hover:scale-125 ${
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