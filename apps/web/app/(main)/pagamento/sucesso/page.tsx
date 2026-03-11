"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { Suspense } from "react"

function SuccessContent() {
  const router = useRouter()
  const params = useSearchParams()
  const amount = params.get("amount")

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pagamento concluído!</h1>
        <p className="text-muted-foreground mb-6">{amount ? `${(Number(amount) / 100).toLocaleString("pt-AO")} Kz processados com sucesso` : "Operação realizada com sucesso"}</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => router.push("/wallet")}>Ver carteira</Button>
          <Button variant="outline" onClick={() => router.push("/feed")}>Ir para o feed</Button>
        </div>
      </div>
    </div>
  )
}

export default function PagamentoSucessoPage() {
  return <Suspense><SuccessContent /></Suspense>
}
