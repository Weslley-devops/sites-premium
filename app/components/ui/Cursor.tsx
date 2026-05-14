"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Custom Ribbon Trail Cursor — KIKK Festival Style.
 * High performance canvas physics + blend modes.
 * Desktop only (hidden on touch/mobile).
 */
export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorText, setCursorText] = useState("");
  
  // Ref tracking raw mouse coordinates for Canvas 60fps loop
  const mouseRef = useRef({ x: -100, y: -100, isHovering: false });
  
  // Motion values for the label (so it updates without React re-renders)
  const labelX = useMotionValue(-100);
  const labelY = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const numPoints = 40;
    const points = Array.from({ length: numPoints }, () => ({ x: -100, y: -100, vx: 0, vy: 0 }));

    const colors = {
      sage: { r: 123, g: 160, b: 130 }, // #7BA082
      sky: { r: 163, g: 206, b: 241 }   // #A3CEF1
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      labelX.set(e.clientX);
      labelY.set(e.clientY - 30); // offset the label slightly above the mouse
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        mouseRef.current.isHovering = true;
        const text = interactive.getAttribute("data-cursor") || "";
        setCursorText(text);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        mouseRef.current.isHovering = false;
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouseRef.current.x !== -100) {
        points[0].x = mouseRef.current.x;
        points[0].y = mouseRef.current.y;

        for (let i = 1; i < numPoints; i++) {
          const pt = points[i];
          const prevPt = points[i - 1];
          const dx = prevPt.x - pt.x;
          const dy = prevPt.y - pt.y;
          
          pt.vx += dx * 0.45;
          pt.vy += dy * 0.45;
          
          pt.vx *= 0.55;
          pt.vy *= 0.55;
          
          pt.x += pt.vx;
          pt.y += pt.vy;
        }

        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.globalCompositeOperation = "multiply";

        // Thicker ribbon if hovering interactive element
        const baseThickness = mouseRef.current.isHovering ? 60 : 45;

        for (let i = 1; i < numPoints - 1; i++) {
          const pt = points[i];
          const nextPt = points[i + 1];
          const prevPt = points[i - 1];
          const xc = (pt.x + nextPt.x) / 2;
          const yc = (pt.y + nextPt.y) / 2;
          const life = 1 - i / numPoints;
          const thickness = life * baseThickness;
          
          const r = Math.round(colors.sage.r + (colors.sky.r - colors.sage.r) * (1 - life));
          const g = Math.round(colors.sage.g + (colors.sky.g - colors.sage.g) * (1 - life));
          const b = Math.round(colors.sage.b + (colors.sky.b - colors.sage.b) * (1 - life));
          const alpha = life * 0.7;

          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.quadraticCurveTo(pt.x, pt.y, xc, yc);
          ctx.lineWidth = Math.max(0.1, thickness);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [labelX, labelY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9998] hidden lg:block"
      />
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ x: labelX, y: labelY }}
        >
          <span className="text-[10px] uppercase tracking-[0.15em] text-bg font-bold bg-accent px-3 py-1.5 rounded-full shadow-lg">
            {cursorText}
          </span>
        </motion.div>
      )}
    </>
  );
}
