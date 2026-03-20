"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Check, AlertTriangle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MulticaixaConfirmarPage() {
  const router = useRouter()
  const [status, setStatus] = useState<"polling" | "confirmed" | "timeout">("polling")
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => { const i = setInterval(() => setElapsed(e => { if (e >= 12) { setStatus("timeout"); clearInterval(i); return e }; return e + 1 }), 1000); return () => clearInterval(i) }, [])

  if (status === "confirmed") { setTimeout(() => router.push("/pagamento/sucesso"), 1500) }

  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      {status === "polling" && <><Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" /><h2 className="text-lg font-bold">A verificar pagamento...</h2><p className="text-xs text-muted-foreground">Polling a cada 10s. Isto pode demorar até 10 minutos.</p><p className="text-[10px] text-muted-foreground">{elapsed}s decorridos</p><Button variant="ghost" className="text-xs" onClick={() => setStatus("confirmed")}>Simular confirmação</Button></>}
      {status === "confirmed" && <><Check className="w-16 h-16 text-green-400 mx-auto" /><h2 className="text-lg font-bold text-green-400">Pagamento confirmado!</h2><p className="text-xs text-muted-foreground">A redirigir...</p></>}
      {status === "timeout" && <><AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto" /><h2 className="text-lg font-bold">Ainda não detectámos o pagamento</h2><p className="text-xs text-muted-foreground">Se já pagaste, pode demorar alguns minutos. Verifica o saldo mais tarde.</p><div className="flex gap-3 justify-center"><Button onClick={() => { setElapsed(0); setStatus("polling") }}>Tentar novamente</Button><Link href="/suporte"><Button variant="outline" className="gap-1"><MessageCircle className="w-3 h-3" />Contactar suporte</Button></Link></div></>}
    </div>
  )
}
