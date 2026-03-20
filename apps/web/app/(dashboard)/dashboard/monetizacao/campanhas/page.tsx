"use client"
import Link from "next/link"
export default function CampanhasPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📢 Campanhas Activas</h1>
      {[{id:"1",brand:"Unitel",desc:"Promover novo plano de dados",period:"1-31 Mar 2026",revenue:"15.000 Kz",viewers:120},{id:"2",brand:"Jumia Angola",desc:"Campanha de Natal antecipada",period:"15-30 Mar 2026",revenue:"8.000 Kz",viewers:67}].map(c => <Link key={c.id} href={`/dashboard/monetizacao/campanhas/${c.id}`}><div className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><div className="flex justify-between"><p className="text-xs font-bold">{c.brand}</p><span className="text-xs font-bold text-primary">{c.revenue}</span></div><p className="text-[9px] text-muted-foreground">{c.desc}</p><p className="text-[8px] text-muted-foreground">{c.period} · {c.viewers} participantes</p></div></Link>)}
    </div>
  )
}
