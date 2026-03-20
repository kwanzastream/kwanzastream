"use client"
import { ActivityLogItem } from "@/components/community/community-components"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function GiftsHistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎁 Gifts Recebidos</h1>
      <div className="flex gap-1"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Histórico</button><Link href="/dashboard/monetizacao/gifts/top-gifters"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Top Gifters</button></Link><Link href="/dashboard/monetizacao/gifts/configurar-agradecimento"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Agradecimento</button></Link></div>
      {[{time:"20 Mar",icon:"🎁",text:"@generous ofereceu 5× Tier 1 (2.500 Kz)"},{time:"18 Mar",icon:"🎁",text:"Anónimo ofereceu 3× Tier 1 (1.500 Kz)"},{time:"15 Mar",icon:"🎁",text:"@community ofereceu 2× Tier 2 (3.000 Kz)"},{time:"10 Mar",icon:"🎁",text:"@superfan ofereceu 1× Tier 3 (3.000 Kz)"}].map((l,i) => <ActivityLogItem key={i} {...l} />)}
    </div>
  )
}
