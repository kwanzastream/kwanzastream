"use client"
export default function RemovidosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Conteúdo Removido</h1>
  <div className="space-y-2">{[{ type: "VOD", title: "Stream com violação", user: "banned-user", date: "15 Mar 2026", by: "@kwanzastream" }].map((c,i) => <div key={i} className="p-3 rounded-xl border border-red-500/20 bg-red-500/5"><p className="text-xs font-semibold line-through">{c.type}: {c.title}</p><p className="text-[10px] text-muted-foreground">@{c.user} · Removido {c.date} por {c.by}</p></div>)}</div></div>) }
