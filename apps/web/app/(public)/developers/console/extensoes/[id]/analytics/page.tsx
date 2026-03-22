"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, BarChart3 } from "lucide-react"
import Link from "next/link"
export default function ExtensaoAnalyticsPage() {
  const { id } = useParams()
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/extensoes/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Extensão</Link>
      <BarChart3 className="w-8 h-8 text-primary" />
      <h1 className="text-xl font-bold">Analytics da Extensão</h1>
      <p className="text-xs text-muted-foreground">Dados de uso disponíveis após publicação.</p>
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "Instalações", value: "—" }, { label: "Activos diários", value: "—" }, { label: "Interacções", value: "—" }].map((m, i) => (
          <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.value}</p><p className="text-[9px] text-muted-foreground">{m.label}</p></div>
        ))}
      </div>
    </div>
  )
}
