"use client"
import { useState } from "react"
import { NewsItem } from "@/components/dashboard/dashboard-home-components"
import { ArrowLeft, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

const NEWS = [
  { title: "Creator Fund — Ciclo Abril 2026", date: "18 Mar 2026", desc: "Candidaturas abertas até 31 de Março. Subsídios mensais para criadores angolanos emergentes.", isNew: true, href: "/creator-fund" },
  { title: "Modo Rádio agora disponível", date: "15 Mar 2026", desc: "Transmissões áudio-only que consomem 10-20x menos dados. Perfeito para DJs e podcasters.", isNew: true, href: "/radio" },
  { title: "Torneios na Kwanza Stream", date: "10 Mar 2026", desc: "Organiza torneios de FIFA, Call of Duty, Mobile Legends. Até 256 participantes com brackets automáticos.", href: "/torneios" },
  { title: "Drops com marcas angolanas", date: "5 Mar 2026", desc: "Parcerias com Unitel, Jumia e BAI para drops exclusivos durante streams ao vivo.", href: "/drops" },
  { title: "Leaderboard por província", date: "1 Mar 2026", desc: "Rankings regionais para criar orgulho local. Vê quem lidera na tua província.", href: "/leaderboard" },
  { title: "Loja do canal disponível", date: "25 Fev 2026", desc: "Vende produtos digitais, merch e experiências directamente no teu canal.", href: "/loja" },
  { title: "Kwanza Camp — formação online", date: "20 Fev 2026", desc: "Cursos gratuitos para melhorar as tuas skills de streaming. OBS, engagement, monetização.", href: "/dashboard/kwanza-camp" },
]

export default function NovidadesPage() {
  const [allRead, setAllRead] = useState(false)
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Link href="/dashboard/inicio"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Novidades</h1></div><Button variant="ghost" size="sm" className="text-[9px] gap-1" onClick={() => { setAllRead(true); toast.success("Todas marcadas como lidas!") }}><CheckCheck className="w-3 h-3" />Marcar todas como lidas</Button></div>
      <div className="space-y-1.5">{NEWS.map(n => <NewsItem key={n.title} {...n} isNew={!allRead && n.isNew} />)}</div>
    </div>
  )
}
