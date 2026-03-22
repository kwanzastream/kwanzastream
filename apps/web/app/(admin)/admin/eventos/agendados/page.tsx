"use client"
export default function EventosAgendadosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Eventos Agendados</h1>
  <div className="space-y-2">{[{ name: "Festival Kwanza", date: "1 Maio 2026", status: "Confirmado" }, { name: "Gaming Night", date: "5 Abr 2026", status: "Em preparação" }].map(e => <div key={e.name} className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs font-semibold">{e.name}</p><p className="text-[10px] text-muted-foreground">{e.date} · {e.status}</p></div>)}</div></div>) }
