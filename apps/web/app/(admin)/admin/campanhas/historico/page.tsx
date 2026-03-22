"use client"
export default function CampanhasHistoricoPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Campanhas — Histórico</h1>
  <div className="space-y-2">{[{ brand: "BAI", name: "Black Friday", spent: "1.2M Kz", period: "Nov 2025" }].map(c => <div key={c.brand} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">{c.brand}: {c.name}</p><p className="text-[10px] text-muted-foreground">{c.spent} · {c.period}</p></div>)}</div></div>) }
