"use client"
import { useState } from "react"
import { Save, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function DiscordPage() {
  const [configured, setConfigured] = useState(false)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎮 Discord</h1>
      <div className="flex gap-1"><Link href="/dashboard/membership/perks-exclusivos/vods"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">VODs</button></Link><Link href="/dashboard/membership/perks-exclusivos/streams-privados"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Streams</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Discord</button></div>
      {!configured ? (
        <div className="p-4 rounded-xl border border-white/10 text-center space-y-3"><p className="text-2xl">🎮</p><p className="text-sm font-bold">Não configurado</p><p className="text-xs text-muted-foreground">Integra com Discord para dar roles automaticamente.</p></div>
      ) : null}
      <div className="space-y-3"><p className="text-[10px] font-bold">1. Convidar bot</p><Button variant="outline" size="sm" className="w-full text-xs gap-1"><ExternalLink className="w-3 h-3" />Convidar Kwanza Stream Bot</Button></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">2. Link do servidor</p><Input placeholder="https://discord.gg/..." className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">3. Mapear tiers → roles</p>{[{t:"Tier 1",r:"Subscritores"},{t:"Tier 2",r:"Super Fãs"},{t:"Tier 3",r:"VIPs"}].map(m => <div key={m.t} className="flex items-center gap-2"><span className="text-xs w-14">{m.t}</span><span className="text-muted-foreground">→</span><Input defaultValue={m.r} className="bg-white/5 flex-1" /></div>)}</div>
      <Button className="w-full font-bold gap-1" onClick={() => { setConfigured(true); toast.success("Discord configurado!") }}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
