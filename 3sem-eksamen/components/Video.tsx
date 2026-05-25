"use client";

import { useRef, useState } from "react";

const accentColor = "oklch(0.65 0.25 8)";

const videos = [
  {
    id: 1,
    src: "/videos/video-crowd.mp4",
    title: "Crowd Energy",
  },
  {
    id: 2,
    src: "/videos/video-dj-crowd1.mp4",
    title: "DJ Crowd",
  },
  {
    id: 3,
    src: "/videos/video-dj-crowd-2.mp4",
    title: "Main Stage",
  },
];

export default function Video() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideo = videos[activeIndex];

  function goToPreviousVideo() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? videos.length - 1 : currentIndex - 1,
    );
    setIsPlaying(false);
  }

  function goToNextVideo() {
    setActiveIndex((currentIndex) =>
      currentIndex === videos.length - 1 ? 0 : currentIndex + 1,
    );
    setIsPlaying(false);
  }

  async function toggleVideo() {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section className="bg-[oklch(0.04_0_0)] px-8 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:text-2xl md:font-medium">
          Latest Video
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />

        <div className="mx-auto mt-12 max-w-[1050px]">
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="group relative block h-[260px] w-full overflow-hidden bg-black md:h-[420px]"
          >
            <video
              key={activeVideo.src}
              ref={videoRef}
              src={activeVideo.src}
              className="h-full w-full object-cover"
              playsInline
              muted
              loop
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            <div className="absolute left-0 top-0 h-0 w-0 border-r-[56px] border-t-[56px] border-r-transparent border-t-[oklch(0.65_0.25_8)] md:border-r-[70px] md:border-t-[70px]" />

            <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[56px] border-l-[56px] border-b-[oklch(0.65_0.25_8)] border-l-transparent md:border-b-[70px] md:border-l-[70px]" />

            {!isPlaying && (
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "64px",
                  height: "64px",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "9999px",
                  border: `4px solid ${accentColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.25s ease",
                }}
              >
                <span
                  style={{
                    width: 0,
                    height: 0,
                    marginLeft: "5px",
                    borderTop: "13px solid transparent",
                    borderBottom: "13px solid transparent",
                    borderLeft: `20px solid ${accentColor}`,
                  }}
                />
              </span>
            )}
          </button>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <button
              type="button"
              aria-label="Previous video"
              onClick={goToPreviousVideo}
              style={{
                width: "36px",
                height: "36px",
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
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderRight: "11px solid #fff",
                }}
              />
            </button>

            <button
              type="button"
              aria-label="Next video"
              onClick={goToNextVideo}
              style={{
                width: "36px",
                height: "36px",
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
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: "11px solid #fff",
                }}
              />
            </button>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {videos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                aria-label={`Show ${video.title}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                }}
                style={{
                  width: "12px",
                  height: "12px",
                  background:
                    activeIndex === index ? accentColor : "#ffffff",
                  border: "0",
                  padding: 0,
                  cursor: "pointer",
                  transition: "transform 0.25s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "scale(1.25)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "scale(1)";
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}