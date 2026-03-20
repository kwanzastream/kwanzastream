"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function TopGiftersPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/gifts/historico"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🏆 Top Gifters</h1></div>
      {[{rank:1,u:"@generous",gifts:45,value:"22.500 Kz",emoji:"🥇"},{rank:2,u:"@community",gifts:23,value:"11.500 Kz",emoji:"🥈"},{rank:3,u:"@superfan",gifts:12,value:"6.000 Kz",emoji:"🥉"}].map(g => <div key={g.rank} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10"><span className="text-sm w-6 text-center">{g.emoji}</span><span className="text-xs font-bold flex-1">{g.u}</span><div className="text-right"><p className="text-xs font-black text-primary">{g.value}</p><p className="text-[8px] text-muted-foreground">{g.gifts} gifts</p></div></div>)}
    </div>
  )
}
