"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const BADGES = [{id:"1m",tier:"1 mês",icon:"🥉"},{id:"3m",tier:"3 meses",icon:"🥈"},{id:"6m",tier:"6 meses",icon:"🥇"},{id:"12m",tier:"12 meses",icon:"💎"},{id:"24m",tier:"24 meses",icon:"👑"}]
export default function BadgesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Badges</h1><Link href="/dashboard/comunidade/badges/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar badge</Button></Link></div>
      <p className="text-[10px] text-muted-foreground">Built-in: 🎤 Streamer · 🛡️ Moderador · 💎 VIP</p>
      <div className="space-y-1"><p className="text-[10px] font-bold">Badges de subscrição (por duração)</p>{BADGES.map(b => <Link key={b.id} href={`/dashboard/comunidade/badges/${b.id}`}><div className="flex items-center gap-3 p-2 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-lg">{b.icon}</span><span className="text-xs font-bold">{b.tier}</span></div></Link>)}</div>
    </div>
  )
}
