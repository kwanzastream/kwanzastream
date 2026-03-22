"use client"
export default function TribosStatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Estatísticas de Tribos</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Tribos activas", v: "23" }, { l: "Membros total", v: "567" }, { l: "Média membros", v: "24" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
