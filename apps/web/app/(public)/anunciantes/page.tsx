import Link from "next/link"
import { BarChart3, Megaphone, Target, Users, Zap } from "lucide-react"

const AD_FORMATS = [
  { icon: "📺", title: "Pre-roll Video", desc: "Anúncio de 15-30s antes do início da stream. Alta visibilidade." },
  { icon: "🎯", title: "Banner Overlay", desc: "Banner no canto inferior da stream. Não intrusivo." },
  { icon: "📌", title: "Sponsored Stream", desc: "Patrocínio de uma stream completa com branding customizado." },
  { icon: "🏷️", title: "Tag de Produto", desc: "Tag interactiva durante a stream com link directo ao produto." },
]

const METRICS = [
  { label: "Viewers únicos/mês", value: "10k+" },
  { label: "Tempo médio de viewing", value: "45min" },
  { label: "Taxa de engagement", value: "8.5%" },
  { label: "Creators activos", value: "500+" },
]

export default function AnunciantesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Anuncie no Kwanza Stream</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Alcance a audiência angolana mais engajada. Publicidade nativa integrada em streams ao vivo.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {METRICS.map((m) => (
          <div key={m.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-2xl font-bold text-primary">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Why */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Porquê anunciar connosco?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Target, title: "Audiência angolana", desc: "100% dos viewers são angolanos ou da diáspora. Segmentação geográfica por província." },
            { icon: Zap, title: "Alto engagement", desc: "Streams ao vivo geram interacção real. Os viewers estão activos e atentos, não passivos." },
            { icon: Users, title: "Creators influentes", desc: "Associa a tua marca aos maiores creators de Angola. Authentic influencer marketing." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <item.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Formats */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Formatos Disponíveis</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {AD_FORMATS.map((fmt) => (
            <div key={fmt.title} className="p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors flex gap-3">
              <span className="text-2xl shrink-0">{fmt.icon}</span>
              <div>
                <h3 className="font-semibold text-sm">{fmt.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{fmt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 space-y-3">
        <Megaphone className="w-8 h-8 text-primary mx-auto" />
        <h2 className="text-xl font-bold">Pronto para alcançar Angola?</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">Contacta a nossa equipa de vendas para um media kit personalizado e preços.</p>
        <a href="mailto:anuncios@kwanzastream.ao?subject=Interesse em publicidade" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          <BarChart3 className="w-4 h-4" /> Pedir media kit
        </a>
      </div>
    </div>
  )
}
