import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sites Premium — Sites Profissionais que Convertem",
  description:
    "Desenvolvimento de sites profissionais, rápidos e premium. Sites que vendem enquanto você dorme. Presença digital de alto impacto para empreendedores e empresas.",
  keywords: [
    "desenvolvimento de sites",
    "sites premium",
    "landing page",
    "web design profissional",
    "criação de sites",
    "sites que convertem",
  ],
  authors: [{ name: "Sites Premium" }],
  openGraph: {
    title: "Sites Premium — Sites Profissionais que Convertem",
    description: "Sites rápidos, premium e feitos para converter visitantes em clientes.",
    url: "https://sitespremium.com.br",
    siteName: "Sites Premium",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sites Premium — Sites Profissionais que Convertem",
    description: "Sites rápidos, premium e feitos para converter visitantes em clientes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Sites Premium",
              description: "Desenvolvimento de sites profissionais premium que convertem visitantes em clientes.",
              url: "https://sitespremium.com.br",
              priceRange: "$$",
              areaServed: "BR",
              serviceType: "Web Development",
              sameAs: ["https://www.instagram.com/wes11ey_blizzard/"],
              contactPoint: { "@type": "ContactPoint", contactType: "sales", availableLanguage: "Portuguese" },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
