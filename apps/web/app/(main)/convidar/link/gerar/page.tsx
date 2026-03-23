"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function GerarLinkPage() {
  const [loading, setLoading] = useState(false); const router = useRouter()
  const generate = async () => {
    setLoading(true)
    try { await api.post("/api/referral/generate"); toast.success("Novo link gerado!"); router.push("/convidar/link") }
    catch { toast.error("Erro ao gerar") } finally { setLoading(false) }
  }
  return (
    <div className="max-w-sm mx-auto px-4 py-12 space-y-6 text-center">
      <h1 className="text-lg font-bold">Gerar novo link de convite</h1>
      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-left"><p className="text-xs text-yellow-400">⚠️ Atenção</p><p className="text-[10px] text-muted-foreground mt-1">Gerar um novo link vai invalidar o link actual. Cliques anteriores não serão perdidos mas novos cliques no link antigo não vão funcionar.</p></div>
      <div className="flex items-center gap-2"><Button variant="outline" onClick={() => router.back()} className="flex-1 text-xs">Cancelar</Button><Button onClick={generate} disabled={loading} className="flex-1 text-xs">{loading ? "A gerar..." : "Confirmar"}</Button></div>
    </div>
  )
}
