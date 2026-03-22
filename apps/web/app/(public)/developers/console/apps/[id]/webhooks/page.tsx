"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft, Plus } from "lucide-react"
import { WebhookRow } from "@/components/developers/webhook-row"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function WebhooksPage() {
  const { id } = useParams()
  const [webhooks, setWebhooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get(`/api/developer/apps/${id}/webhooks`).then(r => setWebhooks(r.data || [])).catch(() => {}).finally(() => setLoading(false)) }, [id])

  const handleTest = async (whId: string) => { try { await api.post(`/api/developer/apps/${id}/webhooks/${whId}/test`); toast.success("Webhook de teste enviado") } catch { toast.error("Erro") } }
  const handleDelete = async (whId: string) => { if (!confirm("Eliminar?")) return; try { await api.delete(`/api/developer/apps/${id}/webhooks/${whId}`); setWebhooks(w => w.filter(wh => wh.id !== whId)); toast.success("Eliminado") } catch { toast.error("Erro") } }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />App</Link>
      <div className="flex justify-between items-center"><h1 className="text-xl font-bold">Webhooks</h1><Link href={`/developers/console/apps/${id}/webhooks/criar`}><Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Adicionar</Button></Link></div>
      {webhooks.length === 0 && <p className="text-xs text-muted-foreground py-8 text-center">Sem webhooks configurados.</p>}
      <div className="space-y-3">{webhooks.map((wh: any) => <WebhookRow key={wh.id} {...wh} onTest={() => handleTest(wh.id)} onDelete={() => handleDelete(wh.id)} />)}</div>
    </div>
  )
}
