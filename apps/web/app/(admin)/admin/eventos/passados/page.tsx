"use client"
export default function EventosPassadosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Eventos Passados</h1>
  <div className="space-y-2">{[{ name: "Stream Jam Março", date: "15 Mar 2026", participants: 45 }].map(e => <div key={e.name} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">{e.name}</p><p className="text-[10px] text-muted-foreground">{e.date} · {e.participants} participantes</p></div>)}</div></div>) }
