"use client"
export default function ReembolsosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Reembolsos</h1>
  <div className="space-y-2">{[{ user: "viewer1", amount: "2.500 Kz", reason: "Disputa", status: "Processado", date: "18 Mar" }].map(r => <div key={r.user} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><div><p className="text-xs font-semibold">@{r.user}</p><p className="text-[10px] text-muted-foreground">{r.reason} · {r.date}</p></div><span className="text-xs font-bold">{r.amount}</span></div>)}</div></div>) }
