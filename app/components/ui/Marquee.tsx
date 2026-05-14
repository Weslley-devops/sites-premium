"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  children: string;
  className?: string;
  /** Speed multiplier — higher = faster */
  speed?: number;
  /** If true, accelerates on scroll */
  scrollReactive?: boolean;
}

/**
 * Infinite horizontal ticker with optional scroll velocity reaction.
 * Duplicates text to create seamless loop.
 * Reference: Basement Studio, Cuberto.
 */
export default function Marquee({
  children,
  className = "",
  speed = 1,
  scrollReactive = true,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useGSAP(() => {
    if (!trackRef.current) return;

    const baseSpeed = 1.5 * speed;
    let currentSpeed = baseSpeed;

    /* Scroll velocity detection */
    if (scrollReactive) {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          currentSpeed = baseSpeed + Math.abs(self.getVelocity() / 300);
        },
      });
    }

    /* Animation loop */
    const animate = () => {
      if (!trackRef.current) return;

      xRef.current -= currentSpeed;

      /* Reset position when half the track has scrolled */
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (Math.abs(xRef.current) >= halfWidth) {
        xRef.current = 0;
      }

      trackRef.current.style.transform = `translateX(${xRef.current}px)`;

      /* Decay speed back to base */
      currentSpeed += (baseSpeed - currentSpeed) * 0.02;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, { scope: trackRef });

  const text = children;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex">
        {/* Duplicate text 4x for seamless loop */}
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="text-display text-text/5 font-extrabold uppercase px-8 select-none [-webkit-text-stroke:1px_rgba(245,245,240,0.08)]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
