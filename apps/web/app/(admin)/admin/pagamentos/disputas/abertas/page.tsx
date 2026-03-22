"use client"
export default function DisputasAbertasPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Disputas Abertas</h1>
  <div className="space-y-2">{[{ id: "d1", buyer: "viewer1", seller: "streamer1", amount: "2.500 Kz", reason: "Produto não entregue", date: "há 3 dias" }].map(d => <div key={d.id} className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><p className="text-xs font-semibold">@{d.buyer} vs @{d.seller}</p><p className="text-[10px] text-muted-foreground">{d.amount} · {d.reason} · {d.date}</p></div>)}</div></div>) }
