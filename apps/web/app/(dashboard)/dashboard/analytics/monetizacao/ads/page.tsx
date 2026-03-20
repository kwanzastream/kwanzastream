"use client"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function AdsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/monetizacao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">📺 Ads</h1></div>
      <div className="p-8 rounded-2xl border border-white/10 text-center space-y-3"><p className="text-3xl">📺</p><p className="text-sm font-bold">Ads ainda não disponíveis</p><p className="text-xs text-muted-foreground">A publicidade integrada será lançada em breve. Quando disponível, poderás ver receita de pre-roll e mid-roll ads aqui.</p><div className="p-3 rounded-xl bg-primary/5 text-[9px] text-muted-foreground flex items-center gap-2"><Info className="w-3 h-3 text-primary shrink-0" /><p>Requisito: estatuto Partner com 500+ seguidores e 25+ viewers médios.</p></div></div>
    </div>
  )
}
