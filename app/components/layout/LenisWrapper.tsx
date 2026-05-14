"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Global smooth scroll wrapper using Lenis.
 * lerp 0.1 for buttery feel, like studiofreight.com.
 */
export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
