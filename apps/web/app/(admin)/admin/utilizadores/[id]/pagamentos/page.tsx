"use client"
import { useParams } from "next/navigation"
export default function UserPaymentsPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Pagamentos</h1>
  <div className="space-y-2">{[{ type: "Depósito", amount: "5.000 Kz", method: "Multicaixa", date: "19 Mar 2026" }, { type: "Levantamento", amount: "12.000 Kz", method: "Unitel Money", date: "15 Mar 2026" }].map((p,i) => <div key={i} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><div><p className="text-xs font-semibold">{p.type}</p><p className="text-[10px] text-muted-foreground">{p.method} · {p.date}</p></div><span className="text-xs font-bold">{p.amount}</span></div>)}</div></div>) }
