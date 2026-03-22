"use client"
export default function BansHistoricoPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Histórico de Bans</h1>
  <div className="space-y-2">{[{ user: "ex-banned", reason: "Spam", date: "10 Mar", unbanned: "17 Mar" }].map(b => <div key={b.user} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">@{b.user}</p><p className="text-[10px] text-muted-foreground">{b.reason} · Banido {b.date} · Removido {b.unbanned}</p></div>)}</div></div>) }
