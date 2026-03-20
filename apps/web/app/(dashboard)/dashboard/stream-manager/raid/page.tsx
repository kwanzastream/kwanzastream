"use client"
import { useState } from "react"
import { ArrowLeft, Search, Swords, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
const SUGGESTIONS = [
  { username: "gamer_ao", cat: "Gaming", viewers: 234, fav: false },
  { username: "dj_luanda", cat: "Música", viewers: 89, fav: true },
  { username: "comedia_kwanza", cat: "Comédia", viewers: 156, fav: false },
]
export default function RaidPage() {
  const [search, setSearch] = useState("")
  const [raiding, setRaiding] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const startRaid = (target: string) => {
    setRaiding(true); setCountdown(10)
    const iv = setInterval(() => setCountdown(p => { if (p && p > 1) return p - 1; clearInterval(iv); toast.success(`Raid para @${target}! 89 viewers enviados ⚔️`); setRaiding(false); setCountdown(null); return null }), 1000)
  }
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">⚔️ Iniciar Raid</h1></div>
      {countdown !== null ? (
        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-3"><Swords className="w-12 h-12 text-primary mx-auto" /><p className="text-3xl font-black text-primary">{countdown}</p><p className="text-xs text-muted-foreground">Raid em curso... Viewers podem optar por não participar.</p><Button variant="outline" onClick={() => { setRaiding(false); setCountdown(null); toast.info("Raid cancelada") }}>Cancelar Raid</Button></div>
      ) : (
        <>
          <div className="flex gap-1"><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar canal..." className="bg-white/5" /><Button size="sm" className="gap-1"><Search className="w-3 h-3" /></Button></div>
          <div className="space-y-1"><p className="text-[10px] font-bold">Sugestões</p>{SUGGESTIONS.map(s => <div key={s.username} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">🎬</div><div className="flex-1"><p className="text-xs font-bold">@{s.username}{s.fav && <span className="text-yellow-400 ml-1">★</span>}</p><p className="text-[8px] text-muted-foreground">{s.cat} · {s.viewers} viewers · AO VIVO</p></div><Button size="sm" onClick={() => startRaid(s.username)} disabled={raiding} className="gap-1"><Swords className="w-3 h-3" />Raid</Button></div>)}</div>
        </>
      )}
    </div>
  )
}
