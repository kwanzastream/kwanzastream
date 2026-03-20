"use client"
import { ActivityLogItem } from "@/components/community/community-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubHistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/subscricoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Histórico de Subs</h1></div>
      {[{time:"20 Mar",icon:"⭐",text:"@new_sub subscreveu Tier 2 (1.500 Kz)"},{time:"19 Mar",icon:"🔄",text:"@loyal renovou Tier 1 (12 meses!)"},{time:"18 Mar",icon:"⬆️",text:"@upgrader fez upgrade T1 → T2"},{time:"17 Mar",icon:"🎁",text:"@generous ofereceu 3× Tier 1"},{time:"15 Mar",icon:"📉",text:"@ex_sub cancelou Tier 1"}].map((l,i) => <ActivityLogItem key={i} {...l} />)}
    </div>
  )
}
