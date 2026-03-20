"use client"
import { useParams } from "next/navigation"
import { Check, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const BENEFITS = ["Tudo do Tier 1", "Emojis animados", "Prioridade no chat", "VODs exclusivos"]

export default function Tier2Page() {
  const { username } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/subscricao/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Tier 2 — 1.500 Kz/mês</h1></div>
      <ul className="space-y-2">{BENEFITS.map(b => <li key={b} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400" />{b}</li>)}</ul>
      <Link href={`/subscricao/${username}/confirmar?tier=tier2`}><Button className="w-full gap-1"><ArrowRight className="w-4 h-4" />Subscrever Tier 2</Button></Link>
    </div>
  )
}
