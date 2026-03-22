"use client"
export default function LogsErrosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Logs — Erros</h1>
  <div className="space-y-1">{[{ error: "RTMP connection timeout", service: "ingest", time: "22 Mar 08:45", count: 3 }, { error: "Redis ECONREFUSED", service: "cache", time: "21 Mar 23:12", count: 1 }].map((e,i) => <div key={i} className="p-2 rounded-lg border border-red-500/20 bg-red-500/5 text-[10px]"><p className="text-red-400">{e.error}</p><p className="text-muted-foreground">{e.service} · {e.time} · {e.count}x</p></div>)}</div></div>) }
