"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
const PROVINCES = ["Luanda","Benguela","Huíla","Cabinda","Malanje","Huambo","Lunda Norte","Lunda Sul","Moxico","Uíge"]
export default function EntregaConfigPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Config Entrega</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Grátis acima de (Kz)</p><Input type="number" defaultValue={5000} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Províncias</p>{PROVINCES.map(p => <div key={p} className="flex items-center justify-between py-1"><label className="flex items-center gap-2"><input type="checkbox" defaultChecked={p === "Luanda" || p === "Benguela"} /><span className="text-xs">{p}</span></label><Input type="number" placeholder="Kz" defaultValue={p === "Luanda" ? 500 : 1500} className="bg-white/5 w-20 h-7 text-[10px]" /></div>)}</div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Entrega configurada!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
