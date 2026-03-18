import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s — Kwanza Stream", default: "Explorar — Kwanza Stream" },
  description: "Descobre conteúdo, criadores e comunidades angolanas no Kwanza Stream. Streams ao vivo, vídeos, clips, shorts, categorias e muito mais.",
  openGraph: {
    title: "Explorar — Kwanza Stream",
    description: "Descobre conteúdo angolano ao vivo. Gaming, Música, Futebol e muito mais.",
    type: "website",
    locale: "pt_AO",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Explorar — Kwanza Stream" }],
  },
}

export default function ExplorarLayout({ children }: { children: React.ReactNode }) {
  return children
}
