"use client"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
export default function WebhookEndpointPage() {
  const { id, endpoint } = useParams()
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}/webhooks`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Webhooks</Link>
      <h1 className="text-xl font-bold">Webhook: {String(endpoint).slice(0, 8)}...</h1>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs text-muted-foreground">ID: {String(endpoint)}</p>
        <p className="text-xs text-muted-foreground">Estado: ✅ Activo</p>
        <p className="text-xs text-muted-foreground">Última entrega: há 5 minutos</p>
        <p className="text-xs text-muted-foreground">Taxa de sucesso: 100%</p>
      </div>
      <h2 className="text-sm font-semibold">Últimas entregas</h2>
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-2 rounded-lg border border-white/10 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>stream.online</span><span className="text-green-400">200 OK</span><span>há {i * 5}min</span>
          </div>
        ))}
      </div>
    </div>
  )
}
