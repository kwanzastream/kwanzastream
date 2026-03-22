"use client"
import { useParams } from "next/navigation"
export default function UserActivityPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Actividade</h1><p className="text-xs text-muted-foreground">Histórico de actividade do utilizador {(id as string).slice(0,8)}</p>
  <div className="space-y-2">{[{ action: "Login", date: "há 2h", ip: "41.x.x.x" }, { action: "Stream iniciado", date: "há 5h", ip: "41.x.x.x" }, { action: "Mensagem no chat", date: "há 6h", ip: "41.x.x.x" }].map((a,i) => <div key={i} className="p-2 rounded-lg border border-white/5 text-xs flex items-center justify-between"><span>{a.action}</span><span className="text-muted-foreground">{a.date} · {a.ip}</span></div>)}</div></div>) }
