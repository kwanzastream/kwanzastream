"use client"
import { useRouter } from "next/navigation"
import { Loader2, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
export default function EKwanzaConfirmarPage() {
  const router = useRouter()
  const [confirmed, setConfirmed] = useState(false)
  useEffect(() => { if (confirmed) setTimeout(() => router.push("/pagamento/sucesso"), 1500) }, [confirmed, router])
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      {!confirmed ? <><Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" /><h2 className="text-lg font-bold">A aguardar confirmação na app e-Kwanza</h2><p className="text-xs text-muted-foreground">Abre a app e-Kwanza e confirma o pagamento.</p><Button variant="ghost" className="text-xs" onClick={() => setConfirmed(true)}>Simular confirmação</Button></> : <><Check className="w-16 h-16 text-green-400 mx-auto" /><h2 className="text-lg font-bold text-green-400">Pagamento confirmado!</h2></>}
    </div>
  )
}
