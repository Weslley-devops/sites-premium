"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  /** data-cursor text to show in custom cursor */
  cursorText?: string;
}

/**
 * Magnetic button — attracted to cursor within a radius.
 * Uses Framer Motion spring physics for the pull effect.
 * Reference: Cuberto, Basement.
 */
export default function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  cursorText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.35;
    const y = (clientY - top - height / 2) * 0.35;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const variants: Record<string, string> = {
    primary:
      "bg-accent text-[#050505] font-bold hover:shadow-[0_0_50px_rgba(205,255,80,0.3)]",
    outline:
      "bg-transparent border border-[rgba(255,255,255,0.15)] text-text hover:border-accent hover:text-accent",
    ghost:
      "bg-transparent text-text-muted hover:text-accent",
    whatsapp:
      "bg-whatsapp text-white font-bold whatsapp-pulse hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]",
  };

  const sizes: Record<string, string> = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-base",
    xl: "px-12 py-5 text-lg",
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      <Component
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        onClick={onClick}
        data-cursor={cursorText}
        className={`
          inline-flex items-center justify-center gap-2.5
          rounded-full uppercase tracking-[0.1em]
          transition-all duration-300 ease-out
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
      >
        {children}
      </Component>
    </motion.div>
  );
}
