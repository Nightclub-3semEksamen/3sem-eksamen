"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
};

export default function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = elementRef.current;

    if (!element) return;

    const initialStyles = {
      up: { opacity: 0, y: 70 },
      down: { opacity: 0, y: -70 },
      left: { opacity: 0, x: 70 },
      right: { opacity: 0, x: -70 },
      scale: { opacity: 0, scale: 0.9 },
    };

    const animation = gsap.fromTo(element, initialStyles[direction], {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay, direction]);

  return <div ref={elementRef}>{children}</div>;
}
