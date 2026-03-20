"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const ROLES = [{id:"1",name:"Embaixador do canal",color:"#FFD700",emoji:"🏆",members:5},{id:"2",name:"Veterano",color:"#C0C0C0",emoji:"🎖️",members:23},{id:"3",name:"Clan de Gaming",color:"#00FF88",emoji:"🎮",members:12}]
export default function RolesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Roles</h1><Link href="/dashboard/comunidade/roles/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar role</Button></Link></div>
      <div className="space-y-1.5">{ROLES.map(r => <Link key={r.id} href={`/dashboard/comunidade/roles/${r.id}`}><div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-lg">{r.emoji}</span><div className="flex-1"><p className="text-xs font-bold" style={{color:r.color}}>{r.name}</p><p className="text-[8px] text-muted-foreground">{r.members} membros</p></div></div></Link>)}</div>
    </div>
  )
}
