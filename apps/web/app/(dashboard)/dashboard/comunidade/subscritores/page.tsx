"use client"
import { useState } from "react"
import { CommunityMemberRow } from "@/components/community/community-components"
import { MetricCard } from "@/components/analytics/analytics-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SUBS = [{u:"@sub_loyal",tier:1,months:12,renew:"25 Mar",gifted:false},{u:"@sub_new",tier:2,months:1,renew:"20 Apr",gifted:false},{u:"@sub_gift",tier:1,months:3,renew:"15 Apr",gifted:true}]
export default function SubscritoresPage() {
  const [tab, setTab] = useState("all")
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-lg font-black">Subscritores</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"><MetricCard icon="⭐" label="Activos" value="89" /><MetricCard icon="💰" label="MRR" value="44.500 Kz" /><MetricCard icon="T1" label="Tier 1" value="67" /><MetricCard icon="T2" label="Tier 2/3" value="22" /></div>
      <div className="flex gap-1">{[{id:"all",l:"Todos"},{id:"activos",l:"Activos",h:"/dashboard/comunidade/subscritores/activos"},{id:"cancelados",l:"Cancelados",h:"/dashboard/comunidade/subscritores/cancelados"},{id:"gift",l:"Gift",h:"/dashboard/comunidade/subscritores/gift"}].map(t => t.h ? <Link key={t.id} href={t.h}><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">{t.l}</button></Link> : <button key={t.id} className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">{t.l}</button>)}</div>
      <div className="space-y-1">{SUBS.map(s => <CommunityMemberRow key={s.u} username={s.u} subtitle={`Tier ${s.tier} · ${s.months} meses · Renova ${s.renew}`} badges={[s.gifted ? "🎁" : `T${s.tier}`]} />)}</div>
    </div>
  )
}
