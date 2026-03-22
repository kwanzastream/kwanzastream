"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const PROJECTS: Record<string, any> = {
  "kwanza-bot": { name: "KwanzaBot", author: "dev_joao", desc: "Bot de moderação e comandos para o chat do Kwanza Stream. Timeout automático, anti-spam, comandos personalizados.", installs: 234, category: "Bot", website: "https://kwanzabot.ao", features: ["Auto-moderação com filtros de palavras", "Comandos !rank, !uptime, !followage", "Mini-jogos no chat", "Logs de moderação"] },
  "salo-overlay": { name: "Salo Alert", author: "overlay_pedro", desc: "Widget HTML para OBS que mostra alertas animados quando alguém envia Salos.", installs: 156, category: "Overlay", features: ["Animações CSS personalizáveis", "Som de alerta configurável", "Leaderboard de doadores", "Dark/Light mode"] },
}
export default function ProjetoPage() {
  const { projeto } = useParams()
  const p = PROJECTS[projeto as string] || { name: "Projecto", author: "anon", desc: "Descrição", features: [], installs: 0 }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/showcase" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Showcase</Link>
      <h1 className="text-xl font-bold">{p.name}</h1>
      <p className="text-xs text-muted-foreground">por @{p.author} · {p.installs} instalações</p>
      <p className="text-sm">{p.desc}</p>
      {p.features?.length > 0 && <div className="space-y-1">{p.features.map((f: string, i: number) => <p key={i} className="text-xs text-muted-foreground">✓ {f}</p>)}</div>}
      <div className="flex gap-2">{p.website && <a href={p.website} target="_blank" rel="noopener"><Button variant="outline" size="sm" className="gap-1.5"><ExternalLink className="w-3 h-3" />Website</Button></a>}
        <Button size="sm" className="gap-1.5"><Download className="w-3 h-3" />Instalar</Button></div>
    </div>
  )
}
