"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ChevronLeft, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function PausarPage() {
  const { id } = useParams()
  const router = useRouter()
  const [c, setC] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState(false)

  useEffect(() => {
    api.get(`/api/ads/campaigns/${id}`).then(r => setC(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const handleToggle = async () => {
    setToggling(true)
    const newStatus = c.status === "active" ? "paused" : "active"
    try { await api.patch(`/api/ads/campaigns/${id}/status`, { status: newStatus }); toast.success(newStatus === "paused" ? "Campanha pausada" : "Campanha retomada"); router.push(`/ads/gerir/${id}`) }
    catch { toast.error("Erro") }
    finally { setToggling(false) }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!c) return <div className="text-center py-20 text-muted-foreground">Campanha não encontrada</div>

  const isPaused = c.status === "paused"

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
      {isPaused ? <Play className="w-12 h-12 text-green-400 mx-auto" /> : <Pause className="w-12 h-12 text-orange-400 mx-auto" />}
      <h1 className="text-xl font-bold">{isPaused ? "Retomar campanha?" : "Pausar campanha?"}</h1>
      <p className="text-sm text-muted-foreground">{c.name}</p>
      <p className="text-xs text-muted-foreground">
        {isPaused ? "A campanha voltará a ser exibida imediatamente." : "A campanha deixará de ser exibida. Podes retomar a qualquer momento."}
      </p>
      <div className="flex flex-col gap-2">
        <Button onClick={handleToggle} disabled={toggling} className="w-full gap-1.5">
          {toggling && <Loader2 className="w-3.5 h-3.5 animate-spin" />}{isPaused ? "Retomar" : "Pausar"}
        </Button>
        <Link href={`/ads/gerir/${id}`}><Button variant="outline" className="w-full">Cancelar</Button></Link>
      </div>
    </div>
  )
}
