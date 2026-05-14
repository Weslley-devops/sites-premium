"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import SplitText from "@/app/components/ui/SplitText";

const services = [
  {
    number: "01",
    title: "Sites Institucionais",
    description:
      "Presença digital premium que transmite autoridade. Design exclusivo, performance máxima e experiência que impressiona desde o primeiro clique.",
    tags: ["Next.js", "Design Custom", "SEO"],
  },
  {
    number: "02",
    title: "Landing Pages",
    description:
      "Cada elemento pensado para guiar o visitante até a ação. Copy estratégica e design que converte visitantes em clientes.",
    tags: ["Conversão", "A/B Testing", "Analytics"],
  },
  {
    number: "03",
    title: "E-commerce",
    description:
      "Lojas online rápidas e seguras. Integração com meios de pagamento, gestão de estoque e experiência de compra fluida.",
    tags: ["Stripe", "Checkout", "Dashboard"],
  },
  {
    number: "04",
    title: "Aplicações Web",
    description:
      "Sistemas web sob medida para automatizar processos do seu negócio. Dashboards, portais de clientes e ferramentas internas.",
    tags: ["React", "APIs", "Cloud"],
  },
];

/**
 * Services — interactive numbered list.
 * Hover expands the item, revealing description and tags.
 * Clean vertical layout with accent number.
 * Reference: Studio Freight, Cuberto.
 */
export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding relative">
      <div className="container-main">
        {/* Section header */}
        <div className="mb-20">
          <Reveal>
            <p className="label mb-4">Serviços</p>
          </Reveal>
          <SplitText as="h2" className="text-heading">
            O que construímos
          </SplitText>
        </div>

        {/* Service list */}
        <div className="border-t border-border">
          {services.map((service, i) => (
            <ServiceItem
              key={service.number}
              service={service}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onLeave={() => setActiveIndex(null)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({
  service,
  isActive,
  onHover,
  onLeave,
  index,
}: {
  service: typeof services[0];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        ref={ref}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="border-b border-border py-8 md:py-10 group"
        data-cursor="Ver"
      >
        <div className="flex items-start gap-6 md:gap-12">
          {/* Number */}
          <span
            className={`text-sm font-mono transition-colors duration-300 ${isActive ? "text-accent" : "text-[#444]"}`}
          >
            {service.number}
          </span>

          {/* Title + expandable content */}
          <div className="flex-1">
            <h3
              className={`text-subheading transition-colors duration-300 ${isActive ? "text-text" : "text-[#666]"}`}
            >
              {service.title}
            </h3>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-text-muted mt-4 max-w-lg text-(length:--text-body)">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 border border-border rounded-full text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isActive ? "#CDFF50" : "#444"}
              strokeWidth="1.5"
              className="transition-colors duration-300"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Reveal>
  );
}
