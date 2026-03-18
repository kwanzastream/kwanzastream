import { MetadataRoute } from "next"
import { ANGOLA_PROVINCES } from "@/lib/angola-provinces"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://kwanzastream.ao"

const STATIC_CATEGORIES = [
  "gaming", "musica", "futebol", "just-talking",
  "criatividade", "irl", "radio", "negocios",
  "kuduro", "semba", "kizomba", "afrohouse",
  "tech", "comedia", "educacao", "culinaria",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ── Static routes ──
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    // Explorar
    { url: `${BASE_URL}/explorar`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/explorar/streams`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${BASE_URL}/explorar/videos`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/explorar/clips`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/explorar/shorts`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/explorar/categorias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/explorar/canais`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/explorar/eventos`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE_URL}/explorar/torneios`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE_URL}/explorar/tribos`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/explorar/radio`, lastModified: now, changeFrequency: "hourly", priority: 0.7 },
    // Ao Vivo
    { url: `${BASE_URL}/ao-vivo`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/ao-vivo/mapa`, lastModified: now, changeFrequency: "hourly", priority: 0.7 },
    // Tendências
    { url: `${BASE_URL}/tendencias`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${BASE_URL}/tendencias/clips`, lastModified: now, changeFrequency: "hourly", priority: 0.7 },
    { url: `${BASE_URL}/tendencias/shorts`, lastModified: now, changeFrequency: "hourly", priority: 0.7 },
    { url: `${BASE_URL}/tendencias/streams`, lastModified: now, changeFrequency: "hourly", priority: 0.7 },
    { url: `${BASE_URL}/tendencias/canais`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/tendencias/categorias`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/tendencias/angola`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    // Schedule
    { url: `${BASE_URL}/schedule`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    // Institucional
    { url: `${BASE_URL}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/como-funciona`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/como-funciona/viewers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/como-funciona/streamers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/como-funciona/monetizacao`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/como-funciona/salos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/como-funciona/subscricoes`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/como-funciona/clips`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/como-funciona/shorts`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/como-funciona/mobile`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/parceiros`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/parceiros/marcas`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/parceiros/agencias`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/parceiros/publishers`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/parceiros/tecnologia`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ]

  // ── Dynamic: Categories ──
  const categoryRoutes: MetadataRoute.Sitemap = STATIC_CATEGORIES.map((slug) => ({
    url: `${BASE_URL}/categoria/${slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }))

  // ── Dynamic: Provinces (mapa) ──
  const provinceRoutes: MetadataRoute.Sitemap = ANGOLA_PROVINCES.map((p) => ({
    url: `${BASE_URL}/angola/mapa/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  // ── Dynamic: Public channels (future — when DB data available) ──
  // const channels = await prisma.user.findMany({ where: { isStreamer: true }, select: { username: true } })
  // const channelRoutes = channels.map(c => ({
  //   url: `${BASE_URL}/${c.username}`, lastModified: now, changeFrequency: "daily", priority: 0.6,
  // }))

  return [...staticRoutes, ...categoryRoutes, ...provinceRoutes]
}
