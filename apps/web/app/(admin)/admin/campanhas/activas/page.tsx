"use client"
export default function CampanhasActivasPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Campanhas Activas</h1>
  <div className="space-y-2">{[{ brand: "Unitel", name: "Promo 5G", budget: "500k Kz", spent: "234k Kz" }].map(c => <div key={c.brand} className="p-3 rounded-xl border border-green-500/20 bg-green-500/5"><p className="text-xs font-semibold">{c.brand}: {c.name}</p><p className="text-[10px] text-muted-foreground">Orçamento: {c.budget} · Gasto: {c.spent}</p></div>)}</div></div>) }
