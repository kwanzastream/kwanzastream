"use client"
export default function AnunciosPendentesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Anúncios Pendentes</h1>
  <div className="space-y-2">{[{ brand: "TPA Mobile", title: "Promo Maio", budget: "200.000 Kz" }].map(a => <div key={a.brand} className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><p className="text-xs font-semibold">{a.brand}: {a.title}</p><p className="text-[10px] text-muted-foreground">Orçamento: {a.budget}</p></div>)}</div></div>) }
