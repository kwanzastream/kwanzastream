"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Heart } from "lucide-react"
import Link from "next/link"

const FRIENDS = ["super_fan", "kuduro_lover", "angola_viewer", "gamer_01"]

export default function GiftSalosPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const filtered = FRIENDS.filter(f => f.includes(search.toLowerCase()))

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/gift"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Heart className="w-5 h-5 text-yellow-400" />Oferecer Salos</h1></div>
      <p className="text-xs text-muted-foreground">Envia Salos como presente a outro utilizador. Diferente de enviar Salos ao streamer durante um stream — isto é um presente social peer-to-peer.</p>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Procurar utilizador..." className="pl-9 bg-white/5" /></div>
      <div className="space-y-1">{filtered.map(f => <button key={f} onClick={() => router.push(`/gift/salos/${f}`)} className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-left"><div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-xs text-yellow-400 font-bold">{f[0].toUpperCase()}</div><span className="text-sm font-bold">@{f}</span></button>)}</div>
      <Link href="/gift/salos/historico" className="block text-xs text-primary hover:underline text-center">Ver histórico de Salos oferecidos →</Link>
    </div>
  )
}
