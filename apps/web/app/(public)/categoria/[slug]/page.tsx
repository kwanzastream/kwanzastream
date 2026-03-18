import type { Metadata } from "next"
import { CategoryPageClient } from "@/components/public/category-page-client"

const CATEGORY_META: Record<string, { emoji: string; name: string; angolaFirst: boolean; description?: string }> = {
  gaming: { emoji: "🎮", name: "Gaming Angola", angolaFirst: true, description: "A comunidade gaming angolana cresce todos os dias. De Free Fire a FIFA, de Mobile Legends a Tekken — o gaming em Angola é real e está aqui." },
  musica: { emoji: "🎵", name: "Música ao Vivo", angolaFirst: true, description: "Kuduro, Semba, Kizomba, Afrohouse — a música angolana ao vivo. DJs, cantores e bandas a transmitir directamente para ti." },
  futebol: { emoji: "⚽", name: "Futebol Angola", angolaFirst: true, description: "Girabola, Seleção Nacional, análises e comentários ao vivo. O futebol angolano tem casa no Kwanza Stream." },
  "just-talking": { emoji: "🎤", name: "Just Talking PT-AO", angolaFirst: true, description: "Conversas, debates e bate-papos em português angolano. O espaço onde Angola fala sem filtros." },
  irl: { emoji: "📍", name: "IRL Angola", angolaFirst: true, description: "Transmissões ao vivo de rua, eventos, mercados e a vida real angolana. Vê Angola como nunca viste." },
  radio: { emoji: "📻", name: "Modo Rádio", angolaFirst: true, description: "Canais de áudio apenas. Menos dados, mais música. Ideal para ouvir enquanto fazes outras coisas." },
  negocios: { emoji: "💼", name: "Negócios & Empreendedorismo", angolaFirst: true, description: "Empreendedores angolanos partilham conhecimento. Negócios, startups e economia angolana." },
  criatividade: { emoji: "🎨", name: "Criatividade & Arte", angolaFirst: true, description: "Arte, design, fotografia e criatividade angolana ao vivo." },
  kuduro: { emoji: "🎵", name: "Kuduro", angolaFirst: true, description: "O ritmo que nasceu em Angola e conquistou o mundo. Kuduro ao vivo, DJs, dançarinos e a cultura que nos define." },
  girabola: { emoji: "⚽", name: "Girabola", angolaFirst: true, description: "A liga de futebol angolana ao vivo. Comentários, análises e transmissões dos jogos." },
  kizomba: { emoji: "💃", name: "Kizomba", angolaFirst: true, description: "A dança e música romántica angolana. Aulas ao vivo, performances e a cultura kizomba." },
  tech: { emoji: "💻", name: "Tech & Dev", angolaFirst: false, description: "Tecnologia, programação e desenvolvimento ao vivo." },
  comedia: { emoji: "😂", name: "Comédia", angolaFirst: false, description: "Comédia ao vivo, stand-up e entretenimento." },
}

function getMeta(slug: string) {
  return CATEGORY_META[slug] || { emoji: "📺", name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), angolaFirst: false }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const meta = getMeta(slug)
  return {
    title: `${meta.emoji} ${meta.name} — Kwanza Stream`,
    description: meta.description || `Explora conteúdo de ${meta.name} ao vivo no Kwanza Stream. Streams, vídeos, clips e canais angolanos.`,
    openGraph: {
      title: `${meta.name} — Kwanza Stream`,
      description: meta.description || `Descobre ${meta.name} no Kwanza Stream.`,
      type: "website",
      locale: "pt_AO",
      images: [{ url: "/og/categoria.png", width: 1200, height: 630, alt: `${meta.name} — Kwanza Stream` }],
    },
  }
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getMeta(slug)
  return <CategoryPageClient slug={slug} meta={meta} />
}
