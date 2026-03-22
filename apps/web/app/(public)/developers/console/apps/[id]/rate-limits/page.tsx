"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, Shield } from "lucide-react"
import Link from "next/link"
export default function RateLimitsPage() {
  const { id } = useParams()
  const limits = [
    { endpoint: "API Global", sandbox: "100 req/min", production: "1.000 req/min" },
    { endpoint: "Chat (write)", sandbox: "10 msg/30s", production: "20 msg/30s" },
    { endpoint: "Chat (moderate)", sandbox: "20 acções/min", production: "100 acções/min" },
    { endpoint: "Webhooks", sandbox: "10 subscrições", production: "100 subscrições" },
  ]
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />App</Link>
      <Shield className="w-8 h-8 text-primary" />
      <h1 className="text-xl font-bold">Rate Limits</h1>
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-xs">
          <thead><tr className="bg-white/5"><th className="px-3 py-2 text-left">Endpoint</th><th className="px-3 py-2 text-left">Sandbox</th><th className="px-3 py-2 text-left">Produção</th></tr></thead>
          <tbody>{limits.map((l, i) => (
            <tr key={i} className="border-t border-white/5"><td className="px-3 py-2">{l.endpoint}</td><td className="px-3 py-2 text-muted-foreground">{l.sandbox}</td><td className="px-3 py-2 text-primary font-medium">{l.production}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">💡 Partners têm acesso a 5.000 req/min em produção. Contacta-nos se precisas de mais.</div>
    </div>
  )
}
