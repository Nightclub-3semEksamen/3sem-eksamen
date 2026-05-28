"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GalleryPhoto = {
  id: number;
  description: string;
  image: string;
  alt: string;
};

type GalleryClientProps = {
  photos: GalleryPhoto[];
};

export default function GalleryClient({ photos }: GalleryClientProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const gallery = galleryRef.current;

    if (!gallery) return;

    const items = gallery.querySelectorAll(".gallery-item");

    const animation = gsap.fromTo(
      items,
      {
        opacity: 0,
        x: -90,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gallery,
          start: "top 80%",
          once: true,
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) => {
          if (currentIndex === null) return currentIndex;
          return currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) => {
          if (currentIndex === null) return currentIndex;
          return currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
        });
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, photos.length]);

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    });
  }

  function showNext() {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    });
  }

  const lightbox =
    activePhoto && isMounted
      ? createPortal(
          <div
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 20px",
            }}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={closeLightbox}
              style={{
                position: "fixed",
                top: "22px",
                right: "28px",
                zIndex: 1000000,
                background: "transparent",
                border: 0,
                color: "#fff",
                fontSize: "52px",
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              style={{
                position: "fixed",
                left: "28px",
                top: "50%",
                zIndex: 1000000,
                width: "48px",
                height: "48px",
                transform: "translateY(-50%)",
                border: "2px solid #fff",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderRight: "14px solid #fff",
                }}
              />
            </button>

            <div
              onClick={(event) => event.stopPropagation()}
              style={{
                maxWidth: "1100px",
                maxHeight: "86vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />

              {activePhoto.description && (
                <p
                  style={{
                    marginTop: "16px",
                    maxWidth: "800px",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {activePhoto.description}
                </p>
              )}
            </div>

            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              style={{
                position: "fixed",
                right: "28px",
                top: "50%",
                zIndex: 1000000,
                width: "48px",
                height: "48px",
                transform: "translateY(-50%)",
                border: "2px solid #fff",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "14px solid #fff",
                }}
              />
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div ref={galleryRef}>
        <div className="mt-12 hidden w-full md:block">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1.2fr 0.85fr 1.2fr 0.75fr",
            }}
          >
            {photos.slice(0, 4).map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openLightbox(index)}
                className="gallery-item h-[255px] overflow-hidden text-left"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </button>
            ))}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1.15fr 1.15fr",
            }}
          >
            {photos.slice(4, 7).map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openLightbox(index + 4)}
                className="gallery-item h-[255px] overflow-hidden text-left"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:hidden">
          {photos.map((photo, index) => {
            const mobileHeights = [
              "h-[330px]",
              "h-[455px]",
              "h-[325px]",
              "h-[565px]",
              "h-[335px]",
              "h-[285px]",
              "h-[290px]",
            ];

            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => openLightbox(index)}
                className={`gallery-item overflow-hidden text-left ${mobileHeights[index]}`}
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {lightbox}
    </>
  );
}