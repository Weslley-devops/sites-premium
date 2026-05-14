"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/app/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 47, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 3, suffix: "", label: "Anos de experiência" },
  { value: 7, suffix: "d", label: "Tempo médio de entrega" },
];

/**
 * Stats — animated counters that tick up on scroll.
 * Giant accent numbers with descriptive labels.
 * Reference: Linear, Vercel.
 */
export default function Stats() {
  return (
    <section id="stats" className="section-padding relative">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.15}>
              <StatCounter stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat }: { stat: typeof stats[0] }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(() => {
    if (!countRef.current || hasAnimated) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (countRef.current) countRef.current.textContent = String(stat.value);
      return;
    }

    const counter = { value: 0 };

    gsap.to(counter, {
      value: stat.value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.round(counter.value).toString();
        }
      },
      onComplete: () => setHasAnimated(true),
    });
  }, { dependencies: [hasAnimated] });

  return (
    <div className="text-center md:text-left">
      <div className="mb-2">
        <span
          ref={countRef}
          className="text-[clamp(3rem,8vw,6rem)] font-extrabold accent leading-none"
        >
          0
        </span>
        <span className="text-[clamp(1.5rem,4vw,3rem)] font-bold accent">
          {stat.suffix}
        </span>
      </div>
      <p className="label">{stat.label}</p>
    </div>
  );
}
