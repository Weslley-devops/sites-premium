"use client";

import { motion } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import SplitText from "@/app/components/ui/SplitText";

const projects = [
  {
    name: "Nova Estética",
    tag: "Landing Page · Clínica de Estética",
    gradient: "from-[#1a1a2e] to-[#16213e]",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    size: "large",
  },
  {
    name: "Cardoso & Assis",
    tag: "Site Institucional · Advocacia",
    gradient: "from-[#1a1a1a] to-[#0d1b2a]",
    stack: ["React", "TypeScript", "GSAP"],
    size: "small",
  },
  {
    name: "FitPro Personal",
    tag: "Landing Page · Personal Trainer",
    gradient: "from-[#1b1b1b] to-[#2d1b30]",
    stack: ["Next.js", "Three.js", "Tailwind"],
    size: "small",
  },
  {
    name: "Sabor & Arte",
    tag: "E-commerce · Confeitaria Artesanal",
    gradient: "from-[#1a1a1a] to-[#1a1508]",
    stack: ["Next.js", "Stripe", "Prisma"],
    size: "large",
  },
];

/**
 * Cases — asymmetric grid with cinematic cards.
 * Scale on hover, gradient overlays, tag system.
 * Reference: 14islands, Active Theory.
 */
export default function Cases() {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="container-main">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <Reveal>
              <p className="label mb-4">Portfólio</p>
            </Reveal>
            <SplitText as="h2" className="text-heading">
              Projetos recentes
            </SplitText>
          </div>
          <Reveal delay={0.3}>
            <p className="text-text-muted max-w-sm" style={{ fontSize: "var(--text-body)" }}>
              Cada projeto é uma oportunidade de criar algo que nunca existiu antes.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              className={project.size === "large" ? "md:col-span-7" : "md:col-span-5"}
              delay={i * 0.1}
            >
              <CaseCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden aspect-[16/10]"
      data-cursor="Ver"
      whileHover="hover"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Project name — gigante, centered */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <motion.h3
          className="text-[clamp(2rem,5vw,4rem)] font-bold text-text/10 text-center select-none"
          style={{ WebkitTextStroke: "1px rgba(245,245,240,0.06)" }}
          variants={{
            hover: { scale: 1.05, opacity: 0.15 },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.name}
        </motion.h3>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <motion.div
          className="transform"
          variants={{
            hover: { y: -8 },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-text mb-1">
            {project.name}
          </h3>
          <p className="text-text-muted text-sm mb-4">{project.tag}</p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-white/5 text-text-muted border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            boxShadow: "inset 0 0 80px rgba(205, 255, 80, 0.05)",
          },
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
