"use client"
import { MessageSquare, Pin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const TOPICS = [
  { id: "oauth-pkce", title: "OAuth PKCE para SPAs — quando?", author: "dev_joao", replies: 12, lastActivity: "há 2h", pinned: true },
  { id: "rate-limit-production", title: "Rate limit em produção parece baixo", author: "botmaker_ao", replies: 8, lastActivity: "há 5h", pinned: false },
  { id: "webhook-retry", title: "Webhooks: política de retry?", author: "api_maria", replies: 5, lastActivity: "há 1d", pinned: false },
  { id: "extensao-tamanho", title: "Limite de 1MB para extensões é suficiente?", author: "ext_dev", replies: 15, lastActivity: "há 2d", pinned: false },
  { id: "eventsub-disconnect", title: "EventSub desconecta após 1h", author: "overlay_pedro", replies: 3, lastActivity: "há 3d", pinned: false },
]
export default function ForumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Fórum de Developers</h1>
        <Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Novo tópico</Button></div>
      <div className="space-y-2">
        {TOPICS.map(t => (
          <Link key={t.id} href={`/developers/forum/${t.id}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">{t.pinned && <Pin className="w-3 h-3 text-primary" />}<p className="text-sm font-medium truncate">{t.title}</p></div>
              <p className="text-[10px] text-muted-foreground">por {t.author} · {t.replies} respostas · {t.lastActivity}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
