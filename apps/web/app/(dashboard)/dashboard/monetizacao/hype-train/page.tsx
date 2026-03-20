"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function HypeTrainConfigPage() {
  const [active, setActive] = useState(true)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🚂 Salos Frenesi</h1>
      <label className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-xs font-bold">Activar Salos Frenesi</span><input type="checkbox" checked={active} onChange={() => setActive(!active)} /></label>
      <div className="space-y-1"><p className="text-[10px] font-bold">Threshold de activação</p><p className="text-[9px] text-muted-foreground">Nº de eventos (Salos + Subs + Gifts) em X minutos</p><div className="grid grid-cols-2 gap-2"><Input type="number" defaultValue={5} className="bg-white/5" /><Input type="number" defaultValue={3} className="bg-white/5" /></div><p className="text-[8px] text-muted-foreground">5 eventos em 3 minutos</p></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Duração</p><Input type="number" defaultValue={5} className="bg-white/5" /><p className="text-[8px] text-muted-foreground">minutos</p></div><div className="space-y-1"><p className="text-[10px] font-bold">Nível máx</p><Input type="number" defaultValue={5} className="bg-white/5" /></div></div>
      <Link href="/dashboard/monetizacao/hype-train/historico"><Button variant="outline" size="sm" className="w-full text-xs">Ver histórico →</Button></Link>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Configurações guardadas!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
