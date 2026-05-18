"use client";

import { useEffect, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaRandom,
  FaVolumeUp,
} from "react-icons/fa";

const tracks = [
  {
    id: 1,
    title: "Club Mood",
    image: "/images/track-1.webp",
    duration: 214,
  },
  {
    id: 2,
    title: "Night Guitar",
    image: "/images/track-2.webp",
    duration: 238,
  },
  {
    id: 3,
    title: "Main Stage",
    image: "/images/track-main.webp",
    duration: 218,
  },
  {
    id: 4,
    title: "Live Stage",
    image: "/images/track-3.webp",
    duration: 196,
  },
  {
    id: 5,
    title: "Late Night",
    image: "/images/track-4.webp",
    duration: 251,
  },
];

const sliderClass =
  "h-[3px] w-full cursor-pointer appearance-none bg-[oklch(0.65_0.25_8)] accent-[oklch(0.65_0.25_8)] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function PreviousTrackIcon() {
  return (
    <span className="inline-flex items-center gap-[2px]">
      <span className="h-5 w-[3px] bg-current" />
      <FaBackward />
    </span>
  );
}

function NextTrackIcon() {
  return (
    <span className="inline-flex items-center gap-[2px]">
      <FaForward />
      <span className="h-5 w-[3px] bg-current" />
    </span>
  );
}

export default function Track() {
  const [volume, setVolume] = useState(78);
  const [activeTrackId, setActiveTrackId] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const activeTrack =
    tracks.find((track) => track.id === activeTrackId) || tracks[2];

  const progress = Math.round((currentSeconds / activeTrack.duration) * 100);

  function selectTrack(trackId: number) {
    setActiveTrackId(trackId);
    setCurrentSeconds(0);
    setIsPlaying(false);
  }

  function goToPreviousTrack() {
    const currentIndex = tracks.findIndex((track) => track.id === activeTrackId);
    const previousIndex =
      currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1;

    selectTrack(tracks[previousIndex].id);
  }

  function goToNextTrack() {
    const currentIndex = tracks.findIndex((track) => track.id === activeTrackId);
    const nextIndex = currentIndex >= tracks.length - 1 ? 0 : currentIndex + 1;

    selectTrack(tracks[nextIndex].id);
  }

  function handleProgressChange(value: number) {
    const nextSeconds = Math.round((value / 100) * activeTrack.duration);
    setCurrentSeconds(nextSeconds);
  }

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setCurrentSeconds((seconds) => {
        if (seconds >= activeTrack.duration) {
          return activeTrack.duration;
        }

        return seconds + 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPlaying, activeTrack.duration]);

  useEffect(() => {
    if (currentSeconds >= activeTrack.duration) {
      setIsPlaying(false);
    }
  }, [currentSeconds, activeTrack.duration]);

  return (
    <section className="bg-black px-8 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:text-2xl md:font-medium">
          Night Club Track
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />

        <div className="mx-auto mt-12 max-w-[1050px]">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            <div className="order-2 mt-16 h-[340px] overflow-hidden md:order-none md:mt-0 md:h-[260px]">
              <div className="relative h-full w-full md:static">
                <img
                  src={activeTrack.image}
                  alt={activeTrack.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/35 md:hidden" />

                <div className="absolute left-0 top-0 h-0 w-0 border-r-[74px] border-t-[74px] border-r-transparent border-t-[oklch(0.65_0.25_8)] md:hidden" />

                <div className="absolute bottom-0 right-0 z-20 h-0 w-0 border-b-[74px] border-l-[74px] border-b-[oklch(0.65_0.25_8)] border-l-transparent md:hidden" />

                <div className="absolute inset-0 flex items-center justify-center md:hidden">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[oklch(0.65_0.25_8)] text-3xl text-[oklch(0.65_0.25_8)]">
                    <FaPlay className="translate-x-[3px]" />
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[46px] bg-black/90 pr-[82px] md:hidden">
                  <div className="flex h-full items-center justify-center">
                    <p className="truncate text-xl font-bold uppercase tracking-[0.08em]">
                      {activeTrack.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col justify-center bg-black px-0 pt-0 text-center md:order-none md:px-10 md:pt-0 md:text-left">
              <h3 className="text-xl font-bold uppercase tracking-[0.04em] md:text-lg">
                {activeTrack.title}
              </h3>

              <div className="mt-10 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(event) =>
                    handleProgressChange(Number(event.target.value))
                  }
                  aria-label="Track progress"
                  className={sliderClass}
                />
              </div>

              <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[150px_1fr_210px] md:gap-7">
                <p className="text-xl font-bold md:text-sm">
                  {formatTime(currentSeconds)} /{" "}
                  {formatTime(activeTrack.duration)}
                </p>

                <div className="flex items-center justify-center gap-8">
                  <button
                    type="button"
                    aria-label="Previous track"
                    onClick={goToPreviousTrack}
                    className="text-3xl transition hover:text-[oklch(0.65_0.25_8)] md:text-xl"
                  >
                    <PreviousTrackIcon />
                  </button>

                  <button
                    type="button"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    onClick={() => setIsPlaying((current) => !current)}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-3xl transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] md:h-12 md:w-12 md:text-xl"
                  >
                    {isPlaying ? (
                      <FaPause />
                    ) : (
                      <FaPlay className="translate-x-[3px] md:translate-x-[2px]" />
                    )}
                  </button>

                  <button
                    type="button"
                    aria-label="Next track"
                    onClick={goToNextTrack}
                    className="text-3xl transition hover:text-[oklch(0.65_0.25_8)] md:text-xl"
                  >
                    <NextTrackIcon />
                  </button>

                  <button
                    type="button"
                    aria-label="Shuffle"
                    onClick={() => {
                      const randomTrack =
                        tracks[Math.floor(Math.random() * tracks.length)];
                      selectTrack(randomTrack.id);
                    }}
                    className="text-3xl transition hover:text-[oklch(0.65_0.25_8)] md:text-xl"
                  >
                    <FaRandom />
                  </button>
                </div>

                <div className="mx-auto flex w-full max-w-[260px] items-center gap-4 md:mx-0 md:max-w-none">
                  <FaVolumeUp className="text-4xl md:text-2xl" />

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    aria-label="Volume"
                    className={sliderClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-8 md:hidden">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goToPreviousTrack}
              className="flex h-16 w-16 items-center justify-center border-2 border-white transition hover:border-[oklch(0.65_0.25_8)]"
            >
              <span className="h-0 w-0 border-y-[12px] border-r-[16px] border-y-transparent border-r-white" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={goToNextTrack}
              className="flex h-16 w-16 items-center justify-center border-2 border-white transition hover:border-[oklch(0.65_0.25_8)]"
            >
              <span className="h-0 w-0 border-y-[12px] border-l-[16px] border-y-transparent border-l-white" />
            </button>
          </div>

          <div className="relative hidden md:block">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goToPreviousTrack}
              className="group absolute -left-14 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-white transition hover:border-[oklch(0.65_0.25_8)] lg:flex"
            >
              <span className="h-0 w-0 border-y-[9px] border-r-[13px] border-y-transparent border-r-white transition group-hover:border-r-[oklch(0.65_0.25_8)]" />
            </button>

            <div className="grid grid-cols-5">
              {tracks.map((track) => {
                const isActive = activeTrackId === track.id;

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => selectTrack(track.id)}
                    className="group relative h-[170px] overflow-hidden bg-black text-left"
                  >
                    <img
                      src={track.image}
                      alt={track.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div
                      className={`absolute inset-0 transition duration-500 ${
                        isActive
                          ? "bg-black/45"
                          : "bg-black/0 group-hover:bg-black/45"
                      }`}
                    />

                    <div
                      className={`absolute inset-0 flex items-center justify-center transition duration-500 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[oklch(0.65_0.25_8)] text-[oklch(0.65_0.25_8)]">
                        <FaPlay className="translate-x-[2px]" />
                      </span>
                    </div>

                    <div
                      className={`absolute left-0 top-0 h-0 w-0 border-r-[36px] border-t-[36px] border-r-transparent border-t-[oklch(0.65_0.25_8)] transition duration-500 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    <div
                      className={`absolute bottom-0 right-0 z-20 h-0 w-0 border-b-[36px] border-l-[36px] border-b-[oklch(0.65_0.25_8)] border-l-transparent transition duration-500 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[28px] bg-black/85 px-4 pr-[44px] text-center transition duration-500 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      <div className="flex h-full items-center justify-center">
                        <p className="truncate text-xs font-bold uppercase tracking-[0.08em]">
                          {track.title}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next slide"
              onClick={goToNextTrack}
              className="group absolute -right-14 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-white transition hover:border-[oklch(0.65_0.25_8)] lg:flex"
            >
              <span className="h-0 w-0 border-y-[9px] border-l-[13px] border-y-transparent border-l-white transition group-hover:border-l-[oklch(0.65_0.25_8)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}