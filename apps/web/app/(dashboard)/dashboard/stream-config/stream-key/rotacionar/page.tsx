"use client"
import { ArrowLeft, RotateCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function RotacionarPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-config/stream-key"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Rotacionar Stream Key</h1></div>
      <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 space-y-2"><div className="flex gap-2"><AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" /><p className="text-xs font-bold text-yellow-400">Atenção!</p></div><ul className="text-[9px] text-muted-foreground space-y-1 list-disc pl-4"><li>Invalida a key actual imediatamente</li><li>Desliga qualquer stream a usar a key actual</li><li>Requer actualização no OBS/Streamlabs</li><li>Email de confirmação enviado</li></ul></div>
      <div className="flex gap-2"><Link href="/dashboard/stream-config/stream-key" className="flex-1"><Button variant="outline" className="w-full text-xs">Cancelar</Button></Link><Button className="flex-1 text-xs gap-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold" onClick={() => toast.success("Nova key gerada! Verifica o teu email.")}><RotateCw className="w-3 h-3" />Rotacionar</Button></div>
    </div>
  )
}
