"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PagamentoErroPage() {
  const router = useRouter()
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pagamento falhado</h1>
        <p className="text-muted-foreground mb-6">O pagamento não foi processado. Verifica os teus dados e tenta novamente.</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => router.push("/wallet/depositar")}>Tentar novamente</Button>
          <Button variant="outline" onClick={() => router.push("/wallet")}>Ver carteira</Button>
        </div>
      </div>
    </div>
  )
}
