"use client"
import { useState } from "react"
import { ExtensionCard } from "@/components/extensions/extension-components"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
const TABS = [{id:"explorar",l:"Explorar"},{id:"instaladas",l:"Instaladas"},{id:"activas",l:"Activas"},{id:"posicoes",l:"Posições"}]
const EXTS = [{icon:"🎯",name:"Goals Bar",desc:"Barra de progresso para objectivos",id:"goals-bar"},{icon:"💛",name:"Salos Alert",desc:"Alertas visuais de Salos ao vivo",id:"salos-alert"},{icon:"📊",name:"Viewer Stats",desc:"Contador de viewers e chat ao vivo",id:"viewer-stats"},{icon:"🎵",name:"Now Playing",desc:"Mostra a música a tocar (Spotify)",id:"now-playing"},{icon:"🗳️",name:"Live Poll",desc:"Poll interactivo integrado no stream",id:"live-poll"}]
export default function ExplorarPage() {
  const [type, setType] = useState("all")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">🧩 Extensões</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={`/dashboard/extensoes/${t.id}`}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "explorar" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar extensões..." className="bg-white/5 pl-8 h-8 text-xs" /></div>
      <div className="flex gap-1 flex-wrap">{["Todos","Overlay","Painel","Componente"].map(f => <button key={f} onClick={() => setType(f)} className={`px-2 py-0.5 rounded text-[8px] ${type === f ? "bg-white/10" : "text-muted-foreground"}`}>{f}</button>)}</div>
      <div className="space-y-2">{EXTS.map(e => <Link key={e.id} href={`/dashboard/extensoes/${e.id}`}><ExtensionCard {...e} author="Kwanza Stream" /></Link>)}</div>
      <div className="p-3 rounded-xl border border-dashed border-white/20 text-center"><p className="text-[9px] text-muted-foreground">+ Extensões de terceiros em breve</p><p className="text-[8px] text-primary">Submeter a tua extensão →</p></div>
    </div>
  )
}
