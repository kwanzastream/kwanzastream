"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { toast } from "sonner"
export default function EncerrarPage() {
  const { id } = useParams(); const router = useRouter()
  const [loading, setLoading] = useState(false)
  const end = async () => {
    setLoading(true)
    try { await api.delete(`/api/watch-parties/${id}`); toast.success("Party encerrada"); router.push("/assistir-junto/historico") }
    catch { toast.error("Erro ao encerrar") } finally { setLoading(false) }
  }
  return (
    <div className="max-w-sm mx-auto px-4 py-12 space-y-6 text-center">
      <h1 className="text-lg font-bold">⚠️ Encerrar Watch Party</h1>
      <p className="text-xs text-muted-foreground">Todos os participantes serão desligados.</p>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left space-y-1"><p className="text-[10px] text-muted-foreground">Duração: <span className="text-foreground">1h 23min</span></p><p className="text-[10px] text-muted-foreground">Participantes: <span className="text-foreground">3</span></p><p className="text-[10px] text-muted-foreground">Mensagens: <span className="text-foreground">156</span></p></div>
      <div className="flex items-center gap-2"><Button variant="outline" onClick={() => router.back()} className="flex-1 text-xs">Cancelar</Button><Button onClick={end} disabled={loading} className="flex-1 text-xs bg-red-600 hover:bg-red-700">{loading ? "A encerrar..." : "Encerrar party"}</Button></div>
    </div>
  )
}
