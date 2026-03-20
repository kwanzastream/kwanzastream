"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const DAYS = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]
const EVENTS = [{day:4,hour:"20h",title:"Gaming Friday",cat:"Gaming"},{day:2,hour:"21h",title:"Conversa",cat:"Just Talking"}]
export default function SchedulePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Schedule</h1><Link href="/dashboard/content/schedule/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Agendar stream</Button></Link></div>
      <div className="grid grid-cols-7 gap-1">{DAYS.map((d, di) => <div key={d} className="space-y-1"><p className="text-[9px] font-bold text-center text-muted-foreground">{d}</p><div className="min-h-[120px] rounded-xl border border-white/10 p-1">{EVENTS.filter(e => e.day === di).map(e => <div key={e.title} className="p-1.5 rounded bg-primary/10 text-[8px] mb-0.5"><p className="font-bold text-primary">{e.hour}</p><p className="truncate">{e.title}</p><p className="text-muted-foreground">{e.cat}</p></div>)}</div></div>)}</div>
    </div>
  )
}
