"use client"
export default function SobreMissaoPage() { return (
  <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">Missão & Valores</h1>
    <p className="text-sm text-muted-foreground">Democratizar a criação de conteúdo em Angola.</p>
    <div className="space-y-3">{[{ icon: "🇦🇴", v: "Angola-First", d: "Cada decisão considera o contexto angolano" }, { icon: "🤝", v: "Comunidade", d: "Construímos juntos" }, { icon: "🎭", v: "Autenticidade", d: "Conteúdo angolano real" }, { icon: "🌍", v: "Inclusão", d: "Acessível a todas as províncias" }, { icon: "💡", v: "Inovação", d: "Tecnologia ao serviço da cultura" }].map(v => <div key={v.v} className="p-4 rounded-xl border border-white/10"><p className="text-sm font-semibold">{v.icon} {v.v}</p><p className="text-xs text-muted-foreground mt-1">{v.d}</p></div>)}</div>
  </div>
) }
