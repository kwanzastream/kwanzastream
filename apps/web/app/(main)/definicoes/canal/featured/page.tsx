"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, Star, Video, Scissors, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function FeaturedPage() {
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" />Conteúdo em Destaque</h1></div>
      <p className="text-[10px] text-muted-foreground">O que aparece na tab Início do teu canal quando estás offline.</p>
      {[{icon:Video,label:"VOD em destaque",desc:"Escolher da lista de VODs"},{icon:Scissors,label:"Clip em destaque",desc:"Escolher da lista de clips"}].map(item => <div key={item.label} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><div className="flex items-center gap-2"><item.icon className="w-4 h-4 text-muted-foreground" /><div><p className="text-xs font-bold">{item.label}</p><p className="text-[8px] text-muted-foreground">{item.desc}</p></div></div><Button size="sm" variant="outline" className="text-[9px]">Escolher</Button></div>)}
      <div className="space-y-1"><p className="text-[10px] font-bold flex items-center gap-1"><Type className="w-3 h-3" />Texto de boas-vindas</p><textarea maxLength={500} rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" onChange={() => setDirty(true)} placeholder="Mensagem para quem visita o teu canal..." /></div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
