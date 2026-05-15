"use client";

import Reveal from "@/app/components/ui/Reveal";

const WHATSAPP_URL = "https://wa.me/5548988298667?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20or%C3%A7amento";
const INSTAGRAM_URL = "https://www.instagram.com/wes11ey_blizzard/";

const links = [
  { label: "Serviços", href: "#services" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Contato", href: "#cta" },
];

/**
 * Giant footer — near-viewport-height, editorial layout.
 * Reference: Cuberto, Basement Studio.
 */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border">
      {/* Main footer content */}
      <div className="container-main py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand — giant */}
          <div className="md:col-span-6">
            <Reveal>
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em] mb-6">
                Sites<br />
                <span className="accent">Premium</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-text-muted max-w-sm text-body">
                Sites profissionais que convertem visitantes em clientes. Rápidos, premium e feitos sob medida.
              </p>
            </Reveal>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <Reveal delay={0.3}>
              <p className="label mb-6">Navegação</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <Reveal delay={0.4}>
              <p className="label mb-6">Contato</p>
              <ul className="space-y-3">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">
                    Instagram
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-main border-t border-border py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs">
            © {new Date().getFullYear()} Sites Premium · Todos os direitos reservados
          </p>
          <button onClick={scrollToTop} aria-label="Voltar ao topo" className="label text-[10px] text-text-dim hover:text-accent transition-colors">
            ↑ Topo
          </button>
        </div>
      </div>
    </footer>
  );
}
