"use client"
import { useState } from "react"
import { ArrowLeft, UserX, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
const BLOCKED = [{ username: "troll_123", date: "15 Mar 2026" }, { username: "spam_bot", date: "10 Mar 2026" }]
export default function BloqueadosPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/privacidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><UserX className="w-5 h-5" />Utilizadores Bloqueados</h1></div>
      <div className="relative"><Search className="absolute left-3 top-2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar..." className="pl-9 bg-white/5" /></div>
      <div className="space-y-1">{BLOCKED.map(b => <div key={b.username} className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div><p className="text-xs font-bold">@{b.username}</p><p className="text-[8px] text-muted-foreground">Bloqueado: {b.date}</p></div><Button size="sm" variant="outline" className="text-[9px]" onClick={() => toast.success(`@${b.username} desbloqueado!`)}>Desbloquear</Button></div>)}</div>
    </div>
  )
}
