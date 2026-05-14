"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Manifesto — large text revealed word-by-word on scroll.
 * Each word goes from dim to bright as scroll progresses.
 * Reference: Basement Studio, Unseen.
 */
export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const text =
    "Não fazemos sites genéricos. Criamos experiências digitais que transformam visitantes em clientes — rápidas, premium e impossíveis de ignorar.";

  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(containerRef.current.querySelectorAll(".manifest-word"), { opacity: 1 });
      return;
    }

    const wordEls = containerRef.current.querySelectorAll(".manifest-word");

    /* Each word fades from dim to full brightness on scroll */
    wordEls.forEach((word, i) => {
      gsap.fromTo(
        word,
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * 20} 60%`,
            end: `top+=${i * 20 + 80} 40%`,
            scrub: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="manifesto" className="section-padding relative" ref={containerRef}>
      <div className="container-main max-w-5xl">
        <p className="text-heading leading-[1.2]">
          {words.map((word, i) => (
            <span key={i} className="manifest-word inline-block mr-[0.3em]" style={{ opacity: 0.1 }}>
              {/* Highlight key words in accent */}
              {["experiências", "clientes", "premium", "ignorar."].includes(word) ? (
                <span className="accent">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
