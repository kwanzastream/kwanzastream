"use client"
export default function ReportsResolvidosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Reports Resolvidos</h1>
  <div className="space-y-2">{[{ type: "Spam", resolved: "@kwanzastream", action: "timeout 24h", date: "18 Mar 2026" }].map((r,i) => <div key={i} className="p-3 rounded-xl border border-green-500/20 bg-green-500/5"><p className="text-xs font-semibold">{r.type}</p><p className="text-[10px] text-muted-foreground">Resolvido por {r.resolved} · Acção: {r.action} · {r.date}</p></div>)}</div></div>) }
