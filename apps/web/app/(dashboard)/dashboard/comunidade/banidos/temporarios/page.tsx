"use client"
import { BanCard } from "@/components/community/community-components"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const BANS = [{u:"@spammer",reason:"Spam repetido",by:"@mod_trusted",duration:"24h",remaining:"18h"},{u:"@troll",reason:"Linguagem ofensiva",by:"Streamer",duration:"1h",remaining:"23min"}]
export default function TemporariosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Bans Temporários</h1>
      <div className="flex gap-1"><Link href="/dashboard/comunidade/banidos/temporarios"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Temporários</button></Link><Link href="/dashboard/comunidade/banidos/permanentes"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Permanentes</button></Link><Link href="/dashboard/comunidade/banidos/apelar"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Apelos</button></Link></div>
      <div className="space-y-1.5">{BANS.map(b => <div key={b.u}><BanCard username={b.u} reason={b.reason} bannedBy={b.by} duration={b.duration} remaining={b.remaining} /><Button variant="outline" size="sm" className="w-full text-[9px] mt-1" onClick={() => toast.success("Ban levantado!")}>Levantar ban</Button></div>)}</div>
    </div>
  )
}
