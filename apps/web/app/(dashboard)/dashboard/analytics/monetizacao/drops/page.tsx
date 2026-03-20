"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const DROPS = [{brand:"Unitel",drop:"Badge Unitel Fan",completed:45,total:200},{brand:"Jumia",drop:"Desconto 10%",completed:23,total:100}]
export default function DropsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/monetizacao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎁 Drops</h1></div>
      <div className="space-y-2">{DROPS.map(d => <div key={d.drop} className="p-3 rounded-xl border border-white/10"><div className="flex items-center justify-between"><p className="text-xs font-bold">{d.drop}</p><span className="text-[8px] text-muted-foreground">{d.brand}</span></div><div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-primary" style={{width:`${(d.completed/d.total)*100}%`}} /></div><p className="text-[8px] text-muted-foreground mt-1">{d.completed}/{d.total} viewers completaram</p></div>)}</div>
    </div>
  )
}
