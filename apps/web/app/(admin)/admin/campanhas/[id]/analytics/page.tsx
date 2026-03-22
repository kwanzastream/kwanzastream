"use client"
export default function CampanhaAnalyticsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Analytics da Campanha</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Impressões", v: "45.000" }, { l: "Cliques", v: "1.200" }, { l: "CTR", v: "2.7%" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
