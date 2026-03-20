"use client"
import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
const DONATIONS = [{date:"20 Mar, 21:34",from:"@superfan",value:"5.000 Kz",msg:"Melhor stream!",stream:"FIFA 26"},{date:"20 Mar, 20:15",from:"@loyal",value:"2.000 Kz",msg:"GG!",stream:"FIFA 26"},{date:"18 Mar, 21:00",from:"@supporter",value:"1.500 Kz",msg:"",stream:"Just Talking"},{date:"18 Mar, 20:30",from:"@viewer1",value:"500 Kz",msg:"🔥🔥🔥",stream:"Just Talking"},{date:"15 Mar, 22:00",from:"@generous",value:"3.000 Kz",msg:"Para o torneio!",stream:"Kuduro DJ"}]
export default function SalosHistoricoPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/salos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Histórico de Salos</h1></div>
      <div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar..." className="bg-white/5 pl-8 h-8 text-xs" /></div>
      <div className="space-y-1">{DONATIONS.map((d,i) => <div key={i} className="p-2.5 rounded-xl border border-white/10"><div className="flex items-center justify-between"><span className="text-xs font-bold">{d.from}</span><span className="text-xs font-black text-primary">{d.value}</span></div><p className="text-[8px] text-muted-foreground">{d.date} · {d.stream}</p>{d.msg && <p className="text-[9px] mt-1 italic">&ldquo;{d.msg}&rdquo;</p>}</div>)}</div>
    </div>
  )
}
