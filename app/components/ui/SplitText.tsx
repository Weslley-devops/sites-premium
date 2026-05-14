"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  /** Delay before first word animates */
  delay?: number;
  /** HTML tag to render */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** If true, animate on scroll; if false, animate on mount */
  onScroll?: boolean;
}

/**
 * Split text into words with staggered GSAP animation.
 * Each word clips up from below with a stagger — classic Awwwards pattern.
 * Reference: Basement Studio, Unseen.
 */
export default function SplitText({
  children,
  className = "",
  delay = 0,
  as: Tag = "h1",
  onScroll = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = children.split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(containerRef.current.querySelectorAll(".word-inner"), { y: 0, opacity: 1 });
      return;
    }

    const wordEls = containerRef.current.querySelectorAll(".word-inner");

    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.05,
      ease: "power3.out",
      delay,
    };

    if (onScroll) {
      gsap.fromTo(
        wordEls,
        { y: "110%", opacity: 0 },
        {
          ...config,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      gsap.fromTo(wordEls, { y: "110%", opacity: 0 }, config);
    }
  }, { scope: containerRef });

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="word-inner inline-block" style={{ opacity: 0, transform: "translateY(110%)" }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
