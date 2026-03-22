"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
const tabs = [
  { label: "Streams", href: "/guardados/streams" },
  { label: "Vídeos", href: "/guardados/videos" },
  { label: "Clips", href: "/guardados/clips" },
  { label: "Shorts", href: "/guardados/shorts" },
  { label: "Canais", href: "/guardados/canais" },
  { label: "Categorias", href: "/guardados/categorias" },
  { label: "Colecções", href: "/guardados/colecoes" },
]
export function SavedNav() {
  const path = usePathname()
  return (
    <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map(t => <Link key={t.href} href={t.href} className={`px-3 py-1.5 rounded-full text-[10px] whitespace-nowrap transition-colors ${path === t.href ? "bg-primary text-white" : "bg-white/5 hover:bg-white/10 text-muted-foreground"}`}>{t.label}</Link>)}
    </nav>
  )
}
