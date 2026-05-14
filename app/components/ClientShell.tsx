"use client";

import dynamic from "next/dynamic";
import LenisWrapper from "@/app/components/layout/LenisWrapper";

/* Dynamic imports — WebGL + heavy components */
const Cursor = dynamic(() => import("@/app/components/ui/Cursor"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/app/components/ui/WhatsAppFloat"), { ssr: false });

/* Section components */
const Hero = dynamic(() => import("@/app/components/sections/Hero"));
const Manifesto = dynamic(() => import("@/app/components/sections/Manifesto"));
const Services = dynamic(() => import("@/app/components/sections/Services"));

const Stats = dynamic(() => import("@/app/components/sections/Stats"));
const Marquee = dynamic(() => import("@/app/components/ui/Marquee"));
const Testimonials = dynamic(() => import("@/app/components/sections/Testimonials"));
const CTA = dynamic(() => import("@/app/components/sections/CTA"));
const Footer = dynamic(() => import("@/app/components/sections/Footer"));

export default function ClientShell() {
  return (
    <LenisWrapper>
      <Cursor />
      <WhatsAppFloat />

      <main>
        <Hero />
        <Manifesto />
        <Services />

        <Stats />
        <Marquee scrollReactive>Sites Premium · Desenvolvimento Web · Landing Pages · E-commerce · Performance</Marquee>
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </LenisWrapper>
  );
}
