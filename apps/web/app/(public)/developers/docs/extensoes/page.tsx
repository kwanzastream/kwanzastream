"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import Link from "next/link"
import { Puzzle, Upload, DollarSign } from "lucide-react"

export default function ExtensoesHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-xl font-bold">Extensões</h1>
        <p className="text-sm text-muted-foreground">Extensões são painéis interactivos que aparecem sobre o player de vídeo.</p>
        <div className="space-y-3">
          {[{ icon: Puzzle, title: "Criar extensão", desc: "HTML/JS/CSS embebido no player", href: "/developers/docs/extensoes/criar" },
            { icon: Upload, title: "Publicar", desc: "Submeter para review e tornar pública", href: "/developers/docs/extensoes/publicar" },
            { icon: DollarSign, title: "Monetizar", desc: "Revenue share e Bits in Extensions (v2)", href: "/developers/docs/extensoes/monetizar" }].map((s, i) => (
            <Link key={i} href={s.href} className="flex gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <s.icon className="w-5 h-5 text-primary shrink-0" /><div><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
