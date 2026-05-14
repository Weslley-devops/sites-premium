"use client";

import Reveal from "@/app/components/ui/Reveal";
import SplitText from "@/app/components/ui/SplitText";
import MagneticButton from "@/app/components/ui/MagneticButton";

const WHATSAPP_URL =
  "https://wa.me/5548988298667?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20or%C3%A7amento";

export default function CTA() {
  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>
      <div className="container-main relative z-10 text-center max-w-4xl mx-auto">
        <Reveal><p className="label mb-6 text-accent">Próximo passo</p></Reveal>
        <SplitText as="h2" className="text-hero mb-8">Vamos criar algo incrível?</SplitText>
        <Reveal delay={0.5}>
          <p className="text-text-muted max-w-lg mx-auto mb-12 text-[length:var(--text-body)]">
            Me conta sobre seu projeto. Sem compromisso. <span className="text-text">Você é dono 100% do código.</span>
          </p>
        </Reveal>
        <Reveal delay={0.7}>
          <MagneticButton href={WHATSAPP_URL} variant="primary" size="xl" cursorText="Falar">Quero meu site</MagneticButton>
        </Reveal>
        <Reveal delay={0.9}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-text-dim mt-12">
            <span className="label text-[11px]">✓ Sem mensalidades</span>
            <span className="label text-[11px]">✓ Código 100% seu</span>
            <span className="label text-[11px]">✓ Suporte 30 dias</span>
            <span className="label text-[11px]">✓ Entrega em 7 dias</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
