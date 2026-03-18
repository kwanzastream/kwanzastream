"use client"
import { useParams } from "next/navigation"
import { Megaphone, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_CAMPANHAS = [
  { id: "c1", brand: "Unitel", title: "Stream com Unitel 5G", status: "active", description: "Assiste streams com tag Unitel e ganha dados grátis" },
  { id: "c2", brand: "Kero", title: "Gaming & Snacks", status: "ended", description: "Campanha encerrada — obrigado a todos!" },
]

export default function ChannelCampanhasPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Campanhas</h2>
      {MOCK_CAMPANHAS.length === 0 ? (
        <div className="text-center py-16"><Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Sem campanhas</p><p className="text-sm text-muted-foreground mt-1">Não há campanhas activas neste canal</p></div>
      ) : (
        <div className="space-y-3">
          {MOCK_CAMPANHAS.map((c) => (
            <div key={c.id} className="rounded-xl border border-border/50 p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"><Megaphone className="w-5 h-5 text-amber-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><p className="font-medium">{c.title}</p><Badge variant={c.status === "active" ? "default" : "secondary"} className="text-[10px]">{c.status === "active" ? "Activa" : "Encerrada"}</Badge></div>
                <p className="text-xs text-muted-foreground mt-0.5">por {c.brand}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
