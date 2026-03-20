"use client"
import { ArrowLeft, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const CHATTERS = [{rank:1,name:"@superfan",msgs:234,emoji:"🥇"},{rank:2,name:"@loyal",msgs:189,emoji:"🥈"},{rank:3,name:"@supporter",msgs:145,emoji:"🥉"},{rank:4,name:"@viewer_ao",msgs:98},{rank:5,name:"@fan_angola",msgs:76},{rank:6,name:"@newbie",msgs:54},{rank:7,name:"@moderador",msgs:45},{rank:8,name:"@sub_tier2",msgs:34}]
export default function TopChattersPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/chat/engagement"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🏆 Top Chatters</h1></div>
      <div className="space-y-1">{CHATTERS.map(c => <div key={c.name} className="flex items-center gap-3 p-2 rounded-xl border border-white/10"><span className="w-6 text-center text-sm">{c.emoji || c.rank}</span><span className="text-xs font-bold flex-1">{c.name}</span><span className="text-[9px] text-muted-foreground">{c.msgs} mensagens</span></div>)}</div>
    </div>
  )
}
