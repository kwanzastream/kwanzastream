import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s — Kwanza Stream", default: "Ao Vivo — Kwanza Stream" },
  description: "Streams ao vivo de criadores angolanos. Gaming, Música, Futebol, IRL e muito mais. Vê quem está ao vivo agora no Kwanza Stream.",
  openGraph: {
    title: "Ao Vivo — Kwanza Stream",
    description: "Streams ao vivo de criadores angolanos. Vê quem está ao vivo agora.",
    type: "website",
    locale: "pt_AO",
    images: [{ url: "/og/mapa.png", width: 1200, height: 630, alt: "Ao Vivo — Kwanza Stream" }],
  },
}

export default function AoVivoLayout({ children }: { children: React.ReactNode }) {
  return children
}
