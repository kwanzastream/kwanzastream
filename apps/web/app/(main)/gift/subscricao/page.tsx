"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Gift } from "lucide-react"
import Link from "next/link"

const FOLLOWED = ["kuduro_master", "esports_ao", "semba_dj", "gospel_angola"]

export default function GiftSubscricaoPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const filtered = FOLLOWED.filter(c => c.includes(search.toLowerCase()))

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/gift"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Oferecer Subscrição</h1></div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Para qual canal?" className="pl-9 bg-white/5" /></div>
      <div className="space-y-1">{filtered.map(c => <button key={c} onClick={() => router.push(`/gift/subscricao/${c}`)} className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-left"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">{c[0].toUpperCase()}</div><span className="text-sm font-bold">@{c}</span></button>)}</div>
    </div>
  )
}
