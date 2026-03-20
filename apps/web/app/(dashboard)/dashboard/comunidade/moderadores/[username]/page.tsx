"use client"
import { useParams } from "next/navigation"
import { ActivityLogItem } from "@/components/community/community-components"
import { ArrowLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const STATS = [{l:"Timeouts",v:"12"},{l:"Bans",v:"3"},{l:"Mensagens eliminadas",v:"45"}]
const LOG = [{time:"14:23",icon:"⏱",text:"Timeout a @spammer (5 min)"},{time:"14:10",icon:"🗑️",text:"Mensagem eliminada de @troll"},{time:"13:45",icon:"🚫",text:"Ban temporário a @abuser (24h)"}]
export default function ModProfilePage() {
  const { username } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/moderadores"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🛡️ @{username}</h1></div>
      <div className="grid grid-cols-3 gap-3">{STATS.map(s => <div key={s.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{s.l}</p><p className="text-sm font-bold">{s.v}</p></div>)}</div>
      <Link href={`/dashboard/comunidade/moderadores/${username}/permissoes`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Settings className="w-3 h-3" />Editar permissões</Button></Link>
      <div className="space-y-0"><p className="text-[10px] font-bold mb-1">Acções recentes</p>{LOG.map((l,i) => <ActivityLogItem key={i} {...l} />)}</div>
    </div>
  )
}
