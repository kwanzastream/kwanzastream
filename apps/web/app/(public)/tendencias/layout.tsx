import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s — Kwanza Stream", default: "Tendências — Kwanza Stream" },
  description: "O que está em alta no Kwanza Stream. Clips virais, streams com mais audiência, canais em crescimento e trending Angola exclusivo.",
  openGraph: {
    title: "Tendências — Kwanza Stream",
    description: "O que está em alta no Kwanza Stream. Conteúdo angolano em ascensão.",
    type: "website",
    locale: "pt_AO",
    images: [{ url: "/og/angola.png", width: 1200, height: 630, alt: "Tendências — Kwanza Stream" }],
  },
}

export default function TendenciasLayout({ children }: { children: React.ReactNode }) {
  return children
}
