"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubGiftPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/subscricoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎁 Gift Subs</h1></div>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="🎁" label="Total gifts" value="23" /><RevenueMetricCard icon="💰" label="Impacto MRR" value="11.500 Kz" /></div>
      <p className="text-[10px] font-bold">Top gifters</p>
      {[{u:"@generous",count:12,value:"6.000 Kz"},{u:"@community",count:8,value:"4.000 Kz"},{u:"Anónimo",count:3,value:"1.500 Kz"}].map(g => <div key={g.u} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><span className="text-xs font-bold">{g.u}</span><div className="text-right"><span className="text-xs font-bold text-primary">{g.value}</span><p className="text-[8px] text-muted-foreground">{g.count} gifts</p></div></div>)}
    </div>
  )
}
