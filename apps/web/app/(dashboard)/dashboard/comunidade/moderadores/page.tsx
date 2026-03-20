"use client"
import { CommunityMemberRow } from "@/components/community/community-components"
import { Button } from "@/components/ui/button"
import { Plus, Shield } from "lucide-react"
import Link from "next/link"
const MODS = [{u:"@mod_trusted",date:"1 Mar 2026",perms:["Timeout","Ban","Delete"],last:"Timeout a @spammer há 2h"},{u:"@mod_new",date:"15 Mar 2026",perms:["Timeout","Delete"],last:"Sem acções recentes"}]
export default function ModeradoresPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">🛡️ Moderadores</h1><Link href="/dashboard/comunidade/moderadores/adicionar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Adicionar</Button></Link></div>
      <div className="space-y-1.5">{MODS.map(m => <Link key={m.u} href={`/dashboard/comunidade/moderadores/${m.u.slice(1)}`}><div className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><div className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /><p className="text-xs font-bold">{m.u}</p></div><p className="text-[8px] text-muted-foreground">Desde {m.date} · {m.perms.join(", ")}</p><p className="text-[8px] text-muted-foreground italic">{m.last}</p></div></Link>)}</div>
    </div>
  )
}
