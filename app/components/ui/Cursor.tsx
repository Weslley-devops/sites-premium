"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Concentric Gradient Cursor — "Gradient Singularity"
 * High precision LERP physics, mix-blend-mode: difference, no trails.
 * Desktop only (hidden on touch/mobile).
 */
export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  // Motion values for the label tracking (avoids React re-renders for mouse movement)
  const labelX = useMotionValue(-100);
  const labelY = useMotionValue(-100);

  // Raw mouse coordinates & state tracking for the 60fps loop
  const mouseRef = useRef({ x: -100, y: -100, isHovering: false, hoverTarget: null as HTMLElement | null });
  // Interpolated cursor coordinates
  const cursorState = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if ("ontouchstart" in window) return;

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let animationFrameId: number;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      labelX.set(e.clientX);
      labelY.set(e.clientY - 40); // text floats slightly above the gradient
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovering(true);
        mouseRef.current.isHovering = true;
        mouseRef.current.hoverTarget = interactive as HTMLElement;
        const text = interactive.getAttribute("data-cursor") || "";
        setCursorText(text);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovering(false);
        mouseRef.current.isHovering = false;
        mouseRef.current.hoverTarget = null;
        setCursorText("");
        (interactive as HTMLElement).style.transform = 'translate3d(0px, 0px, 0)'; // reset any parallax
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      if (mouseRef.current.x === -100) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;

      // Magnetic Hover Logic
      if (mouseRef.current.isHovering && mouseRef.current.hoverTarget) {
        const rect = mouseRef.current.hoverTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = mouseRef.current.x - centerX;
        const distY = mouseRef.current.y - centerY;
        
        // Snaps to center but allows a tiny amount of parallax drag inside the button
        targetX = centerX + (distX * 0.15);
        targetY = centerY + (distY * 0.15);

        // Magnetic pull on the button itself
        mouseRef.current.hoverTarget.style.transform = `translate3d(${distX * 0.2}px, ${distY * 0.2}px, 0)`;
      }

      // High Damping LERP (0.45) for sophisticated tracking without whip
      cursorState.current.x = lerp(cursorState.current.x, targetX, 0.45);
      cursorState.current.y = lerp(cursorState.current.y, targetY, 0.45);

      // Apply transform via GPU
      cursorEl.style.transform = `translate3d(${cursorState.current.x}px, ${cursorState.current.y}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Hide cursor when leaving window
    const handleMouseLeave = () => (cursorEl.style.opacity = '0');
    const handleMouseEnter = () => (cursorEl.style.opacity = '1');
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [labelX, labelY]);

  // CSS variables for gradients to easily toggle them based on hover state
  const baseGradient = "radial-gradient(circle at center, #E6E6FA 10%, #FFB347 40%, #FFD700 65%, #2A0066 100%)";
  const hoverGradient = "radial-gradient(circle at center, #FFFFFF 30%, #FFB347 60%, #FFD700 80%, #2A0066 100%)";

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block transition-all duration-400 ease-out"
        style={{
          width: isHovering ? "36px" : "24px",
          height: isHovering ? "36px" : "24px",
          borderRadius: "50%",
          mixBlendMode: "difference",
          background: isHovering ? hoverGradient : baseGradient,
          willChange: "transform, background, width, height",
        }}
      />
      
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ x: labelX, y: labelY }}
        >
          <span className="text-[10px] uppercase tracking-[0.15em] text-bg font-bold bg-accent px-3 py-1.5 rounded-full shadow-lg mix-blend-normal">
            {cursorText}
          </span>
        </motion.div>
      )}
    </>
  );
}
