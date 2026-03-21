"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function EditarPage() {
  const { id } = useParams()
  const router = useRouter()
  const [c, setC] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [budget, setBudget] = useState(10000)

  useEffect(() => {
    api.get(`/api/ads/campaigns/${id}`).then(r => { setC(r.data); setName(r.data.name); setBudget(r.data.budget) }).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    try { await api.patch(`/api/ads/campaigns/${id}`, { name, budget }); toast.success("Campanha actualizada"); router.push(`/ads/gerir/${id}`) }
    catch { toast.error("Erro") }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!c) return <div className="text-center py-20 text-muted-foreground">Campanha não encontrada</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/ads/gerir/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Campanha</Link>
      <h1 className="text-xl font-bold">Editar campanha</h1>
      <div>
        <label className="text-xs text-muted-foreground">Nome</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground">Orçamento (Kz)</label>
        <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} min={10000} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
      </div>
      <Button onClick={handleSave} disabled={saving} className="w-full gap-1.5">{saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}<Save className="w-3.5 h-3.5" />Guardar</Button>
    </div>
  )
}
