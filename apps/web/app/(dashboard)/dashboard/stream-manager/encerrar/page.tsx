"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Swords, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function EncerrarPage() {
  const router = useRouter()
  const [ending, setEnding] = useState(false)
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold text-red-400">Encerrar Stream</h1></div>
      <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 text-center space-y-2"><p className="text-sm font-bold">Tens a certeza?</p><p className="text-xs text-muted-foreground">Esta acção encerra o stream para todos os viewers.</p></div>
      <div className="grid grid-cols-2 gap-3">{[{l:"Duração",v:"2h 34min"},{l:"Viewers únicos",v:"234"},{l:"Salos recebidos",v:"4.500 Kz"},{l:"Novos seguidores",v:"18"}].map(s => <div key={s.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-[9px] text-muted-foreground">{s.l}</p><p className="text-sm font-bold">{s.v}</p></div>)}</div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Antes de encerrar:</p>
        <Link href="/dashboard/stream-manager/raid"><Button variant="outline" className="w-full gap-1 text-xs"><Swords className="w-3 h-3" />Fazer Raid para outro canal</Button></Link>
        <Button variant="destructive" className="w-full gap-1 font-bold h-12" disabled={ending} onClick={() => { setEnding(true); setTimeout(() => { toast.success("Stream encerrado! Obrigado pela sessão 🙏"); router.push("/dashboard/analytics/stream-summary") }, 2000) }}>{ending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><X className="w-4 h-4" />Encerrar Stream</>}</Button>
      </div>
    </div>
  )
}
