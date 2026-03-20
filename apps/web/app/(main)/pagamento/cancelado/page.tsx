"use client"
import { XCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PagamentoCanceladoPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <XCircle className="w-16 h-16 text-muted-foreground/50 mx-auto" />
      <h2 className="text-xl font-bold">Pagamento cancelado</h2>
      <p className="text-sm text-muted-foreground">O pagamento foi cancelado. Nenhum valor foi cobrado.</p>
      <div className="flex gap-3 justify-center"><Link href="/wallet/saldo"><Button>Voltar à carteira</Button></Link><Link href="/wallet/depositar"><Button variant="outline" className="gap-1"><RefreshCw className="w-3 h-3" />Tentar novamente</Button></Link></div>
    </div>
  )
}
