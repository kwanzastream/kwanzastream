"use client"
export default function AnunciosStatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Estatísticas de Anúncios</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Impressões hoje", v: "45k" }, { l: "Clicks", v: "1.2k" }, { l: "Receita", v: "89k Kz" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
