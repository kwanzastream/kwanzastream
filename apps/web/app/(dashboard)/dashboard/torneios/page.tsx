"use client"

import { useState, useEffect } from "react"
import { Trophy, Swords, Award, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function TorneiosHubPage() {
  const [stats, setStats] = useState({ active: 0, upcoming: 0, organized: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/tournaments")
      .then(res => setStats(res.data.stats || { active: 0, upcoming: 0, organized: 0 }))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <Swords className="w-4 h-4 text-red-400" />
            Activos
          </div>
          <p className="text-2xl font-bold">{stats.active}</p>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <Award className="w-4 h-4 text-yellow-400" />
            Próximos
          </div>
          <p className="text-2xl font-bold">{stats.upcoming}</p>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <Trophy className="w-4 h-4 text-primary" />
            Organizados
          </div>
          <p className="text-2xl font-bold">{stats.organized}</p>
        </div>
      </div>

      {/* Create */}
      <Link href="/torneios/criar?from=dashboard">
        <Button variant="outline" className="gap-2 w-full justify-center py-6 border-dashed border-white/10 hover:border-primary/30">
          <Plus className="w-4 h-4" />
          Criar torneio
        </Button>
      </Link>
    </div>
  )
}
