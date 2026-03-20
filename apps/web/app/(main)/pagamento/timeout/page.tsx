"use client"
import { Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PagamentoTimeoutPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <Clock className="w-16 h-16 text-yellow-400 mx-auto" />
      <h2 className="text-xl font-bold">Pagamento expirado</h2>
      <p className="text-sm text-muted-foreground">O tempo para completar o pagamento expirou. Se já efectuaste o pagamento, contacta o suporte.</p>
      <div className="flex gap-3 justify-center"><Link href="/wallet/depositar"><Button className="gap-1"><RefreshCw className="w-3 h-3" />Tentar novamente</Button></Link><Link href="/suporte"><Button variant="outline">Contactar suporte</Button></Link></div>
    </div>
  )
}
