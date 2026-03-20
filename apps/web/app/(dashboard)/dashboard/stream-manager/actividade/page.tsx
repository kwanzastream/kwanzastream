"use client"
import { useState } from "react"
import { SmActivityItem } from "@/components/stream-manager/sm-components"
import { ArrowLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const EVENTS = [
  { time: "14:35", icon: "⚔️", text: "Raid recebido: 45 viewers de @canal_amigo" },
  { time: "14:33", icon: "🎬", text: "@clipper criou um clip" },
  { time: "14:32", icon: "👥", text: "100 viewers — milestone!" },
  { time: "14:30", icon: "🎁", text: "@gifter ofereceu 5 subscrições" },
  { time: "14:28", icon: "⭐", text: "@user subscreveu (Tier 1, 3 meses)" },
  { time: "14:27", icon: "💛", text: "@fan enviou 500 Salos \"Força Angola!\"" },
  { time: "14:25", icon: "🎉", text: "@viewer seguiu o canal" },
  { time: "14:24", icon: "💛", text: "@outro_fan enviou 200 Salos" },
  { time: "14:23", icon: "🎉", text: "@newbie seguiu o canal" },
  { time: "14:20", icon: "🎯", text: "@viewer completou drop: Badge Angola" },
]
export default function ActividadePage() {
  const [show, setShow] = useState(50)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Actividade ao Vivo</h1></div><div className="flex gap-1">{[20,50,100].map(n => <button key={n} onClick={() => setShow(n)} className={`px-2 py-0.5 rounded text-[8px] ${show === n ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{n}</button>)}</div></div>
      <div className="space-y-0">{EVENTS.map((e, i) => <SmActivityItem key={i} {...e} />)}</div>
    </div>
  )
}
