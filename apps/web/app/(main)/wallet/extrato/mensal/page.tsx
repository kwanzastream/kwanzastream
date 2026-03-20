"use client"
import { useState } from "react"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const MONTHS = ["Março 2026","Fevereiro 2026","Janeiro 2026","Dezembro 2025","Novembro 2025","Outubro 2025"]
export default function ExtratoMensalPage() {
  const [selected, setSelected] = useState("Março 2026")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/extrato"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Extracto Mensal</h1></div>
      <div className="space-y-1">{MONTHS.map(m => <button key={m} onClick={() => setSelected(m)} className={`w-full p-3 rounded-xl border text-left text-sm font-bold transition-all ${selected === m ? "border-primary/30 bg-primary/5" : "border-white/10"}`}>{m}</button>)}</div>
      <Button className="w-full gap-1"><Download className="w-4 h-4" />Descarregar {selected} — PDF</Button>
    </div>
  )
}
