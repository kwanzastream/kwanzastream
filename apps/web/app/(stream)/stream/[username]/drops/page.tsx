"use client"
import { useParams } from "next/navigation"
import { Gift, Clock, Check, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_DROPS = [
  { id: "d1", title: "Badge Exclusivo Março", brand: "Kwanza Stream", progress: 18, required: 30, unit: "min", status: "available" as const },
  { id: "d2", title: "Emote Animado 🔥", brand: "Unitel", progress: 60, required: 60, unit: "min", status: "claimed" as const },
  { id: "d3", title: "Desconto 20% na Loja", brand: "Kero", progress: 5, required: 45, unit: "min", status: "available" as const },
]

export default function StreamDropsPage() {
  const { username } = useParams()
  return (
    <div className="min-h-screen max-w-lg mx-auto p-4 space-y-4">
      <h2 className="font-bold text-lg flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> Drops activos</h2>
      <p className="text-sm text-muted-foreground">Assiste e ganha recompensas durante este stream</p>
      <div className="space-y-3">
        {MOCK_DROPS.map((d) => (
          <div key={d.id} className={`rounded-xl border p-4 space-y-3 ${d.status === "claimed" ? "border-green-500/30 bg-green-500/5" : "border-white/10"}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-sm">{d.title}</p>
                <p className="text-[10px] text-muted-foreground">por {d.brand}</p>
              </div>
              {d.status === "claimed" ? (
                <Badge className="bg-green-500/20 text-green-400 border-none text-[10px] gap-0.5"><Check className="w-3 h-3" />Resgatado</Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] gap-0.5"><Clock className="w-3 h-3" />{d.required - d.progress} {d.unit}</Badge>
              )}
            </div>
            {/* Progress bar */}
            <div className="space-y-1">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${d.status === "claimed" ? "bg-green-500" : "bg-primary"}`}
                  style={{ width: `${Math.min((d.progress / d.required) * 100, 100)}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground text-right">
                {d.progress}/{d.required} {d.unit} assistidos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
