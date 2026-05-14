"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Y offset for slide-up */
  y?: number;
  /** Duration */
  duration?: number;
  /** If true, trigger once; if false, re-trigger on every scroll pass */
  once?: boolean;
}

/**
 * Reusable scroll-triggered reveal animation.
 * Uses GSAP ScrollTrigger for precise scroll-driven control.
 * Fades in + slides up from below.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 60,
  duration = 0.8,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    /* Check for reduced motion preference */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
