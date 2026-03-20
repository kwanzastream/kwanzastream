"use client"
import { ArrowLeft, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function StrikesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/copyright"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Strikes</h1></div>
      <div className="p-8 rounded-2xl border border-white/10 text-center space-y-3"><p className="text-3xl">🎉</p><p className="text-sm font-bold">Nenhum strike activo</p><p className="text-xs text-muted-foreground">O teu canal está em boas condições.</p></div>
      <div className="p-3 rounded-xl bg-white/5 text-[9px] text-muted-foreground space-y-2">
        <div className="flex items-start gap-2"><Info className="w-3 h-3 text-primary shrink-0 mt-0.5" /><p><strong>O que é um strike?</strong> Strikes são penalizações mais graves que claims. Receber 3 strikes resulta no encerramento do canal.</p></div>
        <div className="flex items-start gap-2"><AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" /><p><strong>Impacto:</strong> 1 strike = aviso · 2 strikes = funcionalidades limitadas · 3 strikes = canal encerrado</p></div>
        <p>Strikes expiram após 90 dias se não houver novas infracções.</p>
      </div>
    </div>
  )
}
