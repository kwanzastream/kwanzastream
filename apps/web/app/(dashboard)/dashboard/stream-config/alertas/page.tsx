"use client"
import Link from "next/link"
export default function AlertasHubPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🔔 Alertas</h1>
      {[{l:"Novo seguidor",v:"✅ Activo",h:"/dashboard/stream-config/alertas/follows"},{l:"Salos recebidos",v:"✅ ≥ 200 Kz",h:"/dashboard/stream-config/alertas/salos"},{l:"Nova subscrição",v:"✅ Activo",h:"/dashboard/stream-config/alertas/subs"},{l:"Raid recebido",v:"✅ Activo",h:"/dashboard/stream-config/alertas/raids"},{l:"Achievements",v:"❌ Inactivo",h:"/dashboard/stream-config/alertas/achievements"}].map(a => <Link key={a.l} href={a.h}><div className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-xs font-bold">{a.l}</span><span className="text-[9px]">{a.v}</span></div></Link>)}
    </div>
  )
}
