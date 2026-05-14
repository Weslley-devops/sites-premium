"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor — dot + ring that reacts to interactive elements.
 * Desktop only (hidden on touch/mobile).
 * Reference: Basement Studio, Cuberto.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if ("ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    /* Detect interactive elements and change cursor style */
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovering(true);
        const text = interactive.getAttribute("data-cursor") || "";
        setCursorText(text);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          width: 8,
          height: 8,
          background: isHovering ? "#CDFF50" : "#F5F5F0",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "background 0.2s, width 0.3s, height 0.3s",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring — spring follow, scales on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden lg:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          border: isHovering ? "1px solid rgba(205, 255, 80, 0.5)" : "1px solid rgba(245, 245, 240, 0.2)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s",
        }}
      >
        {cursorText && (
          <span className="text-[10px] uppercase tracking-[0.15em] text-accent font-medium">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
