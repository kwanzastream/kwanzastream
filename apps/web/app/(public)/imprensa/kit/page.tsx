"use client"
export default function ImprensaKitPage() { return (
  <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">📦 Kit de Imprensa</h1>
    <p className="text-xs text-muted-foreground">Recursos para jornalistas e media.</p>
    <div className="space-y-3">{[{ l: "Logos (PNG/SVG)", d: "Fundo claro e escuro" }, { l: "Screenshots", d: "Capturas da plataforma" }, { l: "Factos e Números", d: "Estatísticas actualizadas" }, { l: "Bio do Fundador", d: "Biografia oficial" }, { l: "Política de uso da marca", d: "Regras de utilização do logótipo" }].map(i => <div key={i.l} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><div><p className="text-xs font-semibold">{i.l}</p><p className="text-[10px] text-muted-foreground">{i.d}</p></div><span className="text-[9px] text-primary">📥</span></div>)}</div>
    <button className="w-full py-3 rounded-xl border border-primary text-primary text-xs hover:bg-primary/5 transition-colors">⬇ Descarregar kit completo (ZIP)</button>
  </div>
) }
