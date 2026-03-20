"use client"
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CopyrightHubPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <h1 className="text-lg font-bold">⚖️ Copyright</h1>
      <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20 text-center space-y-2"><Shield className="w-8 h-8 text-green-400 mx-auto" /><p className="text-sm font-bold text-green-400">✅ Em boas condições</p><p className="text-xs text-muted-foreground">Nenhum strike activo</p></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Claims activos",v:"0"},{l:"Strikes activos",v:"0"},{l:"Claims resolvidos",v:"2"}].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-sm font-bold">{m.v}</p></div>)}</div>
      <div className="space-y-1">
        <Link href="/dashboard/content/copyright/claims"><Button variant="outline" size="sm" className="w-full text-xs">Ver claims →</Button></Link>
        <Link href="/dashboard/content/copyright/strikes"><Button variant="outline" size="sm" className="w-full text-xs">Ver strikes →</Button></Link>
      </div>
    </div>
  )
}
