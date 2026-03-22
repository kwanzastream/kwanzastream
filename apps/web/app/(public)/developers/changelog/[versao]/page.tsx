"use client"
import { useParams } from "next/navigation"
import { ChangelogEntry } from "@/components/developers/changelog-entry"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const DATA: Record<string, any> = {
  "v1.2.0": { version: "v1.2.0", date: "20 Mar 2026", changes: ["Novo endpoint: GET /v1/clips — criar e listar clips", "EventSub: stream.offline event adicionado", "Rate limits aumentados de 100 para 1.000 req/min para Partners", "Bugfix: pagination cursor em /v1/streams agora devolve resultados correctos", "Nova documentação: Overlays guide"] },
  "v1.1.0": { version: "v1.1.0", date: "1 Mar 2026", changes: ["Webhooks: 8 tipos de eventos suportados", "OAuth: novos scopes chat:moderate e analytics:read", "Endpoint: /v1/analytics/revenue para revenue do canal", "Docs: toda a documentação disponível em PT-AO"] },
  "v1.0.0": { version: "v1.0.0", date: "1 Fev 2026", changes: ["Lançamento inicial", "9 endpoints REST", "OAuth 2.0 com 13 scopes", "Console de developer com sandbox", "WebSocket para chat em tempo real"] },
}

export default function VersaoPage() {
  const { versao } = useParams()
  const v = DATA[versao as string]
  if (!v) return <div className="text-center py-20 text-muted-foreground">Versão não encontrada</div>
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/changelog" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Changelog</Link>
      <ChangelogEntry {...v} />
    </div>
  )
}
