"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SplitText from "@/app/components/ui/SplitText";
import MagneticButton from "@/app/components/ui/MagneticButton";
import Reveal from "@/app/components/ui/Reveal";

const HeroScene = dynamic(
  () => import("@/app/components/webgl/HeroScene"),
  { ssr: false }
);

const WHATSAPP_URL =
  "https://wa.me/5548988298667?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20or%C3%A7amento";

/**
 * Hero section — the first impression.
 * WebGL distortion background + massive typography + magnetic CTA.
 */
export default function Hero() {
  const scrollDown = () => {
    document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL background */}
      <Suspense fallback={<div className="absolute inset-0 bg-bg" />}>
        <HeroScene />
      </Suspense>

      {/* Content overlay */}
      <div className="relative z-10 container-main text-center max-w-6xl mx-auto pointer-events-none">
        {/* Label */}
        <Reveal delay={0.2}>
          <p className="label mb-8 text-accent">Agência de sites premium</p>
        </Reveal>

        {/* Headline — GIGANTE */}
        <SplitText
          className="text-hero mb-8"
          delay={0.4}
          onScroll={false}
        >
          Sites que vendem enquanto você dorme.
        </SplitText>

        {/* Subheadline */}
        <Reveal delay={1.2}>
          <p className="text-text-muted max-w-xl mx-auto mb-12 text-body">
            Presença digital que trabalha{" "}
            <span className="text-text">24 horas por dia.</span>{" "}
            Rápidos, premium e feitos para{" "}
            <span className="accent">converter.</span>
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={1.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <MagneticButton href={WHATSAPP_URL} variant="primary" size="lg" cursorText="Falar">
              Quero meu site
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" onClick={scrollDown} cursorText="Scroll">
              Explorar
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Reveal delay={2}>
          <div className="flex flex-col items-center gap-2">
            <span className="label text-[10px]">Scroll</span>
            <div className="w-px h-12 bg-linear-to-b from-text/20 to-transparent relative overflow-hidden">
              <div
                className="w-full h-4 bg-accent animate-[scrollLine_2s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-16px); }
          50% { transform: translateY(48px); }
          100% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}
