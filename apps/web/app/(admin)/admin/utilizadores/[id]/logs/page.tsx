"use client"
import { useParams } from "next/navigation"
export default function UserLogsPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Logs</h1>
  <div className="space-y-1">{[{ action: "Login", ip: "41.x.x.x", date: "20 Mar 14:23" }, { action: "Password reset", ip: "41.x.x.x", date: "18 Mar 10:45" }].map((l,i) => <div key={i} className="p-2 rounded-lg border border-white/5 text-[10px] flex items-center justify-between"><span>{l.action}</span><span className="text-muted-foreground">{l.ip} · {l.date}</span></div>)}</div></div>) }
