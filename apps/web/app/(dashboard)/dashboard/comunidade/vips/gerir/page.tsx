"use client"
import { useState } from "react"
import { ArrowLeft, Plus, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function GerirVipsPage() {
  const [vips, setVips] = useState(["@vip_gamer", "@vip_music"])
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/vips"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Gerir VIPs</h1></div>
      <div className="flex gap-1"><Input placeholder="Pesquisar username..." className="bg-white/5 text-xs" /><Button size="sm" className="gap-1 text-xs" onClick={() => toast.success("VIP adicionado!")}><Plus className="w-3 h-3" />Adicionar</Button></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">VIPs actuais ({vips.length}/100)</p>{vips.map(v => <div key={v} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><span className="text-xs font-bold">{v}</span><Button size="icon" variant="ghost" onClick={() => { setVips(vips.filter(x => x !== v)); toast.info("VIP removido") }}><X className="w-3 h-3 text-red-400" /></Button></div>)}</div>
    </div>
  )
}
