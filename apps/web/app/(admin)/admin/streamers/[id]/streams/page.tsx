"use client"
export default function StreamerStreamsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Streams do Streamer</h1>
  <div className="space-y-2">{[{ title: "Gaming session", date: "20 Mar", viewers: 234, dur: "3h" }, { title: "Kuduro live", date: "18 Mar", viewers: 156, dur: "2h" }].map((s,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.date} · {s.viewers} viewers · {s.dur}</p></div>)}</div></div>) }
