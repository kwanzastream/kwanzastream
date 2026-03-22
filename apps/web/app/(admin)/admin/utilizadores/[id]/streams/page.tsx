"use client"
import { useParams } from "next/navigation"
export default function UserStreamsPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Streams do Utilizador</h1>
  <div className="space-y-2">{[{ title: "Gaming session #1", date: "20 Mar 2026", viewers: 234, duration: "3h 20min" }, { title: "Kuduro live", date: "18 Mar 2026", viewers: 156, duration: "2h 10min" }].map((s,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.date} · {s.viewers} viewers · {s.duration}</p></div>)}</div></div>) }
