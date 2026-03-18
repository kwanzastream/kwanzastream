"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { Radio as RadioIcon, Music, History } from "lucide-react"

export default function ChannelRadioPage() {
  const { username } = useParams()
  const [radioEnabled, setRadioEnabled] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then((res) => {
      const u = res.data.user
      if (u?.settings?.radioEnabled === false) setRadioEnabled(false)
    }).catch(() => {})
  }, [username])

  if (!radioEnabled) {
    return (
      <div className="text-center py-16">
        <RadioIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Modo Rádio não disponível</p>
        <p className="text-sm text-muted-foreground mt-1">Este canal não tem o modo rádio activado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="font-semibold text-lg flex items-center justify-center gap-2">
          <RadioIcon className="w-5 h-5 text-primary" /> Modo Rádio
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Player de áudio de @{username}</p>
      </div>

      {/* Player */}
      <div className="rounded-2xl border border-border/50 bg-muted/10 p-6 text-center space-y-4">
        <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 mx-auto flex items-center justify-center">
          <Music className="w-12 h-12 text-primary" />
        </div>
        <div>
          <p className="font-bold">Em pausa</p>
          <p className="text-sm text-muted-foreground">A aguardar que o streamer inicie o modo rádio</p>
        </div>
        <div className="w-full h-1 bg-muted rounded-full">
          <div className="h-full w-0 bg-primary rounded-full" />
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-sm font-medium flex items-center gap-1.5 mb-3"><History className="w-4 h-4" /> Histórico</h3>
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">Sem histórico de áudio</p>
        </div>
      </div>
    </div>
  )
}
