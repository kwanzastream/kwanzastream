"use client"
import { ArrowLeft, Upload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarBadgePage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/badges"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Badge</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Duração de subscrição</p><select className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>1 mês</option><option>3 meses</option><option>6 meses</option><option>12 meses</option><option>24 meses</option></select></div>
      <div className="p-6 border-2 border-dashed border-white/20 rounded-xl text-center"><Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" /><p className="text-xs text-muted-foreground">PNG · 18×18px (cria versões maiores auto)</p></div>
      <div className="p-3 rounded-xl bg-white/5"><p className="text-[10px] font-bold mb-1">Preview no chat:</p><p className="text-xs">🏷️ <span className="font-bold">@viewer</span>: Boa stream!</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Badge criado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
