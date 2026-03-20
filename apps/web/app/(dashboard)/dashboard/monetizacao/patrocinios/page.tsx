"use client"
import Link from "next/link"
export default function PatrociniosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🤝 Patrocínios</h1>
      {[{id:"1",brand:"TAAG",value:"50.000 Kz/mês",duration:"3 meses",status:"Pendente",cls:"text-yellow-400"},{id:"2",brand:"Nova Cimangola",value:"30.000 Kz/mês",duration:"1 mês",status:"Aprovado",cls:"text-green-400"},{id:"3",brand:"Refriango",value:"20.000 Kz/mês",duration:"2 meses",status:"Rejeitado",cls:"text-red-400"}].map(p => <Link key={p.id} href={`/dashboard/monetizacao/patrocinios/${p.id}`}><div className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><div className="flex justify-between"><p className="text-xs font-bold">{p.brand}</p><span className={`text-[9px] font-bold ${p.cls}`}>{p.status}</span></div><p className="text-[9px] text-muted-foreground">{p.value} · {p.duration}</p></div></Link>)}
    </div>
  )
}
