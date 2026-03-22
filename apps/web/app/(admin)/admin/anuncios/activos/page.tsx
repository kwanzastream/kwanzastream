"use client"
export default function AnunciosActivosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Anúncios Activos</h1>
  <div className="space-y-2">{[{ brand: "Unitel", title: "5G Angola", impressions: "234k", ctr: "2.1%" }].map(a => <div key={a.brand} className="p-3 rounded-xl border border-green-500/20 bg-green-500/5"><p className="text-xs font-semibold">{a.brand}: {a.title}</p><p className="text-[10px] text-muted-foreground">{a.impressions} impressões · CTR: {a.ctr}</p></div>)}</div></div>) }
