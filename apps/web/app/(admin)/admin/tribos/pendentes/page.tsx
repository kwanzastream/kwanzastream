"use client"
export default function TribosPendentesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Tribos Pendentes</h1>
  <div className="space-y-2">{[{ name: "Gamers Luanda", creator: "user1", members: 12 }].map(t => <div key={t.name} className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><p className="text-xs font-semibold">{t.name}</p><p className="text-[10px] text-muted-foreground">@{t.creator} · {t.members} membros · Aguarda aprovação</p></div>)}</div></div>) }
