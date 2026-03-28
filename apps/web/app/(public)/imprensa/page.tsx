import Link from "next/link"
import { Download, Mail, ExternalLink } from "lucide-react"

const PRESS_RELEASES = [
  { date: "Mar 2026", title: "Kwanza Stream lança em beta pública", desc: "A primeira plataforma angolana de streaming ao vivo abre portas ao público." },
  { date: "Fev 2026", title: "Parceria com creators angolanos", desc: "Mais de 50 criadores de conteúdo juntam-se ao programa beta privado." },
  { date: "Jan 2026", title: "Kwanza Stream anuncia ronda de investimento", desc: "Financiamento para expandir a infra de streaming no mercado angolano." },
]

const STATS = [
  { label: "Criadores activos", value: "500+" },
  { label: "Streams diários", value: "50+" },
  { label: "Províncias cobertas", value: "21" },
  { label: "Lançamento", value: "2026" },
]

export default function ImprensaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Imprensa</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Kit de imprensa, comunicados e recursos para jornalistas e parceiros de media.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Press Kit */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Kit de Imprensa</h2>
            <p className="text-sm text-muted-foreground mt-1">Logótipos, guidelines de marca, screenshots e assets oficiais.</p>
          </div>
          <a href="mailto:imprensa@kwanzastream.ao?subject=Pedido de Kit de Imprensa" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
            <Download className="w-4 h-4" /> Solicitar kit
          </a>
        </div>
      </div>

      {/* Press Releases */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Comunicados de Imprensa</h2>
        <div className="space-y-3">
          {PRESS_RELEASES.map((pr) => (
            <div key={pr.title} className="p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
              <span className="text-[10px] text-primary font-medium">{pr.date}</span>
              <h3 className="font-semibold mt-1">{pr.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{pr.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center space-y-2">
        <Mail className="w-6 h-6 text-primary mx-auto" />
        <p className="font-semibold">Contacto para Imprensa</p>
        <p className="text-sm text-muted-foreground">Para entrevistas, citações e informações sobre o Kwanza Stream:</p>
        <a href="mailto:imprensa@kwanzastream.ao" className="text-primary hover:underline text-sm font-medium">imprensa@kwanzastream.ao</a>
      </div>
    </div>
  )
}
