"use client"
export default function LojaStatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Estatísticas da Loja</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Vendas total", v: "123" }, { l: "Volume", v: "234k Kz" }, { l: "Comissão", v: "35k Kz" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
