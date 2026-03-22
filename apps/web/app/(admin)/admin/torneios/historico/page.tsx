"use client"
export default function TorneiosHistoricoPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Histoŕico de Torneios</h1>
  <div className="space-y-2">{[{ name: "FIFA Cup Março", date: "15 Mar 2026", winner: "@gamer1", prize: "25.000 Kz" }].map(t => <div key={t.name} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">{t.name}</p><p className="text-[10px] text-muted-foreground">{t.date} · Vencedor: {t.winner} · {t.prize}</p></div>)}</div></div>) }
