"use client"
import { CommunityMemberRow } from "@/components/community/community-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CanceladosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/subscritores"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Cancelados (30d)</h1></div>
      {[{u:"@ex_sub1",t:"Tier 1 · Cancelou 5 Mar · Motivo: financeiro"},{u:"@ex_sub2",t:"Tier 2 · Cancelou 1 Mar · Sem motivo"}].map(s => <CommunityMemberRow key={s.u} username={s.u} subtitle={s.t} />)}
      <p className="text-[8px] text-muted-foreground text-center">Churn: 5% — abaixo da média da plataforma (8%).</p>
    </div>
  )
}
