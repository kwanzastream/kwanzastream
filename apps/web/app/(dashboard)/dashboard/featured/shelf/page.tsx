"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShelfPreview } from "@/components/featured/shelf-preview"
import type { FeaturedChannel } from "@/components/featured/featured-channel-row"
import { LayoutGrid, Loader2, Settings2, Users } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function ShelfPage() {
  const [type, setType] = useState<"channels" | "team" | "disabled">("disabled")
  const [channels, setChannels] = useState<FeaturedChannel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => {
        setType(res.data.shelf?.type || "disabled")
        setChannels(res.data.shelf?.channels || [])
      })
      .catch(() => toast.error("Erro ao carregar shelf"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <LayoutGrid className="w-5 h-5" /> Shelf do Canal
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tipo actual: <span className="font-medium text-foreground">
              {type === "channels" ? "Canais recomendados" : type === "team" ? "Equipa" : "Desactivada"}
            </span>
          </p>
        </div>
      </div>

      <ShelfPreview channels={channels} type={type} />

      <div className="flex gap-2">
        <Link href="/dashboard/featured/shelf/tipo">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Settings2 className="w-3.5 h-3.5" /> Mudar tipo
          </Button>
        </Link>
        {type === "channels" && (
          <Link href="/dashboard/featured/shelf/canais">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Users className="w-3.5 h-3.5" /> Gerir canais
            </Button>
          </Link>
        )}
        {type === "team" && (
          <Link href="/dashboard/featured/shelf/equipa">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Users className="w-3.5 h-3.5" /> Membros
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
