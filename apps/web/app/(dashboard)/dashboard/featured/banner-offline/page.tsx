"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BannerPreview } from "@/components/featured/banner-preview"
import { Image, Loader2, Plus, Trash2, Lightbulb } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function BannerOfflinePage() {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => setBannerUrl(res.data.offlineBannerUrl || null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleRemove = async () => {
    try {
      await api.patch("/api/creator/featured/banner", { bannerUrl: null })
      setBannerUrl(null)
      toast.success("Banner removido")
    } catch {
      toast.error("Erro ao remover")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <Image className="w-5 h-5" /> Banner Offline
      </h2>

      {bannerUrl ? (
        <>
          <BannerPreview src={bannerUrl} />
          <div className="flex gap-2">
            <Link href="/dashboard/featured/banner-offline/editar">
              <Button variant="outline" size="sm">Alterar banner</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleRemove} className="gap-1.5 text-red-400 hover:text-red-300 border-red-500/20">
              <Trash2 className="w-3.5 h-3.5" /> Remover
            </Button>
          </div>
        </>
      ) : (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center space-y-3">
          <Image className="w-10 h-10 text-muted-foreground mx-auto" />
          <div>
            <p className="text-sm font-medium">Sem banner personalizado</p>
            <p className="text-[10px] text-muted-foreground">Quando offline, os teus viewers vêem o teu banner de perfil.</p>
          </div>
          <Link href="/dashboard/featured/banner-offline/editar">
            <Button variant="outline" size="sm" className="gap-1.5 mt-2">
              <Plus className="w-3.5 h-3.5" /> Adicionar banner offline
            </Button>
          </Link>
        </div>
      )}

      {/* Tips */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="w-4 h-4 text-yellow-400" /> Dicas
        </div>
        <ul className="text-[10px] text-muted-foreground space-y-1 list-disc list-inside">
          <li>Inclui quando voltas a transmitir</li>
          <li>Adiciona as tuas redes sociais</li>
          <li>Usa as cores do teu canal</li>
        </ul>
      </div>
    </div>
  )
}
