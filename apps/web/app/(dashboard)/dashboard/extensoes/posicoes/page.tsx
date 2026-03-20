"use client"
import { PositionSlot } from "@/components/extensions/extension-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const TABS = [{id:"explorar",l:"Explorar"},{id:"instaladas",l:"Instaladas"},{id:"activas",l:"Activas"},{id:"posicoes",l:"Posições"}]
export default function PosicoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">🧩 Posições</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={`/dashboard/extensoes/${t.id}`}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "posicoes" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="space-y-2"><div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center"><p className="text-[8px] text-muted-foreground uppercase">Stream (16:9)</p><div className="mt-2"><PositionSlot label="Overlay" extension="💛 Salos Alert" /></div></div><PositionSlot label="Painel" extension="🎯 Goals Bar" /><div className="grid grid-cols-3 gap-2"><PositionSlot label="Componente esq." empty /><div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">CHAT</p></div><PositionSlot label="Componente dir." empty /></div></div>
      <div className="space-y-1"><Link href="/dashboard/extensoes/posicoes/overlay"><Button variant="outline" size="sm" className="w-full text-xs">Gerir Overlay →</Button></Link><Link href="/dashboard/extensoes/posicoes/painel"><Button variant="outline" size="sm" className="w-full text-xs">Gerir Painel →</Button></Link><Link href="/dashboard/extensoes/posicoes/componente"><Button variant="outline" size="sm" className="w-full text-xs">Gerir Componente →</Button></Link></div>
    </div>
  )
}
