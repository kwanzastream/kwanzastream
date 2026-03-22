"use client"
export default function BansActivosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Bans Activos</h1>
  <div className="space-y-2">{[{ user: "banned1", reason: "Conteúdo ilegal", date: "15 Mar", type: "Permanente" }].map(b => <div key={b.user} className="p-3 rounded-xl border border-red-500/20 bg-red-500/5"><p className="text-xs font-semibold text-red-400">@{b.user}</p><p className="text-[10px] text-muted-foreground">{b.reason} · {b.type} · {b.date}</p></div>)}</div></div>) }
