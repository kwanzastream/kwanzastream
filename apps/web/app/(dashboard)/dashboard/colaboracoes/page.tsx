"use client"
import Link from "next/link"
const TABS = [{id:"st",l:"Stream Together",h:"/dashboard/colaboracoes/stream-together"},{id:"fav",l:"Favoritos",h:"/dashboard/colaboracoes/favoritos"},{id:"di",l:"Drop-ins",h:"/dashboard/colaboracoes/drop-ins/configurar"},{id:"raid",l:"Raid",h:"/dashboard/colaboracoes/raid/enviar"},{id:"sc",l:"Shared Chat",h:"/dashboard/colaboracoes/shared-chat"},{id:"eq",l:"Equipa",h:"/dashboard/colaboracoes/equipa"}]
export default function ColaboracoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">🤝 Colaborações</h1>
      <div className="flex gap-1 overflow-x-auto pb-1">{TABS.map(t => <Link key={t.id} href={t.h}><button className="px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap bg-white/5 text-muted-foreground hover:bg-white/10">{t.l}</button></Link>)}</div>
      <div className="space-y-1">{[{l:"📺 Stream Together",v:"Sem co-stream activo",h:"/dashboard/colaboracoes/stream-together"},{l:"⭐ Favoritos",v:"3 canais",h:"/dashboard/colaboracoes/favoritos"},{l:"🎤 Drop-ins",v:"Só favoritos",h:"/dashboard/colaboracoes/drop-ins/configurar"},{l:"⚔️ Raid",v:"3 recebidos esta semana",h:"/dashboard/colaboracoes/raid/enviar"},{l:"💬 Shared Chat",v:"Activo",h:"/dashboard/colaboracoes/shared-chat"},{l:"👥 Equipa",v:"4 membros",h:"/dashboard/colaboracoes/equipa"}].map(s => <Link key={s.l} href={s.h}><div className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-xs font-bold">{s.l}</span><span className="text-[9px] text-muted-foreground">{s.v}</span></div></Link>)}</div>
    </div>
  )
}
