"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import SplitText from "@/app/components/ui/SplitText";

const testimonials = [
  {
    name: "Camila Rezende",
    role: "Psicóloga · Clínica Mente Plena",
    text: "Meu site ficou incrível. Em 2 semanas já recebi 12 novos pacientes pelo Google. Melhor investimento que fiz no meu consultório.",
  },
  {
    name: "Ricardo Almeida",
    role: "CEO · Almeida Construções",
    text: "Profissional excepcional. Entregou antes do prazo e o resultado superou todas as expectativas. Site rápido e elegante.",
  },
  {
    name: "Ana Paula Torres",
    role: "Dentista · Sorriso Premium",
    text: "Finalmente tenho um site que representa a qualidade do meu trabalho. Moderno, rápido e meus pacientes elogiam muito.",
  },
];

/**
 * Testimonials — stacked cards with navigation.
 * Large quote typography, minimal author info.
 * Reference: Linear testimonials pattern.
 */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container-main max-w-4xl">
        {/* Section header */}
        <div className="mb-16">
          <Reveal>
            <p className="label mb-4">Depoimentos</p>
          </Reveal>
          <SplitText as="h2" className="text-heading">
            Quem já confia
          </SplitText>
        </div>

        {/* Testimonial card */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Quote */}
              <blockquote
                className="text-subheading leading-[1.3] mb-10 text-text"
              >
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Initials avatar */}
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">
                    {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-text font-semibold text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-text-muted text-xs">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Próximo"
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </button>
          <span className="text-text-dim text-sm ml-4 font-mono">
            {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
