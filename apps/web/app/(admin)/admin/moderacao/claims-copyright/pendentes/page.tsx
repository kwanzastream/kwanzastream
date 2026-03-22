"use client"
export default function ClaimsPendentesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Claims Copyright Pendentes</h1>
  <div className="space-y-2">{[{ claimant: "Music Label AO", target: "@streamer1", content: "VOD com música protegida", date: "há 1 dia" }].map((c,i) => <div key={i} className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><p className="text-xs font-semibold">{c.claimant} → @{c.target}</p><p className="text-[10px] text-muted-foreground">{c.content} · {c.date}</p></div>)}</div></div>) }
