"use client";

import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** Normalized 0-1 across viewport */
  nx: number;
  ny: number;
}

/**
 * Tracks mouse position globally.
 * Returns raw coords + normalized (0-1) coords for shader uniforms.
 */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0.5, ny: 0.5 });

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({
      x: e.clientX,
      y: e.clientY,
      nx: e.clientX / window.innerWidth,
      ny: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  return pos;
}
