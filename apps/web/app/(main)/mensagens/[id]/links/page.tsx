"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

interface SharedLink { id: string; url: string; title: string; description?: string; image?: string; domain: string }

const MOCK_LINKS: SharedLink[] = [
  { id: "l1", url: "https://kwanzastream.com/stream/gamer", title: "Angola Gamer — Stream ao vivo", description: "Valorant Ranked 🇦🇴", domain: "kwanzastream.com", image: "/placeholder.jpg" },
  { id: "l2", url: "https://youtube.com/watch?v=xyz", title: "Tutorial de OBS para Angola", description: "Setup completo para streaming", domain: "youtube.com" },
  { id: "l3", url: "https://twitter.com/kwanzastream", title: "@kwanzastream no Twitter", domain: "twitter.com" },
]

export default function ConversationLinksPage() {
  const params = useParams()
  const convId = params.id as string
  const [filter, setFilter] = useState("")

  const filtered = filter ? MOCK_LINKS.filter(l => l.domain.includes(filter)) : MOCK_LINKS
  const domains = [...new Set(MOCK_LINKS.map(l => l.domain))]

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/mensagens/${convId}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-xl font-bold">Links partilhados</h1>
      </div>

      {/* Domain filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button onClick={() => setFilter("")} className={`shrink-0 px-3 py-1.5 rounded-full text-xs border ${!filter ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>Todos</button>
        {domains.map(d => (
          <button key={d} onClick={() => setFilter(d)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs border ${filter === d ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{d}</button>
        ))}
      </div>

      {/* Links */}
      <div className="space-y-2">
        {filtered.map(link => (
          <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <div className="flex gap-3">
              {link.image && <img src={link.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{link.title}</p>
                {link.description && <p className="text-[10px] text-muted-foreground truncate mt-0.5">{link.description}</p>}
                <div className="flex items-center gap-1 mt-1"><LinkIcon className="w-2.5 h-2.5 text-muted-foreground" /><p className="text-[10px] text-muted-foreground">{link.domain}</p></div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1" />
            </div>
          </a>
        ))}
        {filtered.length === 0 && <div className="text-center py-8"><LinkIcon className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" /><p className="text-xs text-muted-foreground">Sem links partilhados</p></div>}
      </div>
    </div>
  )
}
