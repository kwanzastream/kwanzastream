"use client"
export default function StreamsReportadosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Streams Reportados</h1>
  <div className="space-y-2">{[{ title: "Stream suspeito", user: "user-report-1", reason: "Conteúdo inapropriado", date: "há 3h" }].map(s => <div key={s.user} className="p-3 rounded-xl border border-red-500/20 bg-red-500/5"><p className="text-xs font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">@{s.user} · {s.reason} · {s.date}</p></div>)}</div></div>) }
