"use client"
export default function PartnersPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Partners</h1>
  <div className="space-y-2">{[1,2].map(i => <div key={i} className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs font-semibold">@partner-{i}</p><p className="text-[10px] text-muted-foreground">Partner desde Jan 2026 · Contrato activo · {i*5000} Kz/mês</p></div>)}</div></div>) }
