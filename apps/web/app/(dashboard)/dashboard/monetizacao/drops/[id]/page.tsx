"use client"
import { useParams } from "next/navigation"
import { DropProgressCard } from "@/components/monetization/monetization-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function DropDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/drops"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Drop — Unitel</h1></div>
      <DropProgressCard brand="Unitel" prize="1GB dados grátis" progress={234} total={500} revenue="5.000 Kz" />
      <div className="grid grid-cols-2 gap-3">{[{l:"Início",v:"1 Mar 2026"},{l:"Fim",v:"31 Mar 2026"},{l:"Comissão/viewer",v:"21 Kz"},{l:"Tempo mínimo",v:"15 min watching"}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
    </div>
  )
}
