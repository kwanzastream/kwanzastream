"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const BUILTIN = [{code:":angola:",img:"🇦🇴"},{code:":kuduro:",img:"💃"},{code:":salos:",img:"💛"},{code:":live:",img:"🔴"},{code:":gg:",img:"🎮"}]
const CUSTOM = [{id:"1",code:":hype:",img:"🔥",tier:"Todos"},{id:"2",code:":love:",img:"❤️",tier:"Tier 1+"},{id:"3",code:":pog:",img:"😮",tier:"Tier 1+"}]
export default function EmotesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Emotes</h1><Link href="/dashboard/comunidade/emotes/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar emote</Button></Link></div>
      <div className="space-y-1"><p className="text-[10px] font-bold text-muted-foreground">Emotes da plataforma</p>{BUILTIN.map(e => <div key={e.code} className="flex items-center gap-3 p-2 rounded-xl border border-white/10"><span className="text-lg w-8 text-center">{e.img}</span><span className="text-xs font-mono">{e.code}</span></div>)}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Custom do canal (3/10 · Tier 1)</p>{CUSTOM.map(e => <Link key={e.id} href={`/dashboard/comunidade/emotes/${e.id}`}><div className="flex items-center gap-3 p-2 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-lg w-8 text-center">{e.img}</span><span className="text-xs font-mono flex-1">{e.code}</span><span className="text-[8px] text-muted-foreground">{e.tier}</span></div></Link>)}</div>
    </div>
  )
}
