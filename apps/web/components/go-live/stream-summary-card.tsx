"use client"

import { Button } from "@/components/ui/button"
import { Clock, Users, Eye, Zap, Heart, Film, Share2, BarChart3, Video } from "lucide-react"
import Link from "next/link"

interface StreamSummaryData {
  duration: number // seconds
  uniqueViewers: number
  peakViewers: number
  salosReceived: number
  newFollowers: number
  clipsCreated: number
  username: string
  vodId?: string
}

export function StreamSummaryCard({
  duration, uniqueViewers, peakViewers, salosReceived, newFollowers, clipsCreated, username, vodId,
}: StreamSummaryData) {
  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60)
    return h > 0 ? `${h}h ${m}min` : `${m} min`
  }

  const handleShare = () => {
    const text = `Acabei de transmitir ao vivo no Kwanza Stream durante ${formatDuration(duration)}! 🇦🇴🔴`
    const url = `https://kwanzastream.ao/${username}`
    if (navigator.share) {
      navigator.share({ title: "Kwanza Stream", text, url })
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank")
    }
  }

  const stats = [
    { icon: Clock, label: "Duração total", value: formatDuration(duration) },
    { icon: Users, label: "Viewers únicos", value: uniqueViewers.toLocaleString("pt-AO") },
    { icon: Eye, label: "Peak viewers", value: peakViewers.toLocaleString("pt-AO") },
    { icon: Zap, label: "Salos recebidos", value: `${salosReceived.toLocaleString("pt-AO")} Kz`, color: "text-[#F9D616]" },
    { icon: Heart, label: "Novos seguidores", value: `+${newFollowers}`, color: "text-[#CE1126]" },
    { icon: Film, label: "Clips criados", value: String(clipsCreated) },
  ]

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-4xl mb-2">🎉</p>
        <h2 className="text-xl font-bold">Stream concluído!</h2>
        <p className="text-sm text-muted-foreground mt-1">Obrigado por transmitires no Kwanza Stream</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color || "text-muted-foreground"}`} />
            <p className={`text-lg font-bold ${s.color || ""}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white" onClick={handleShare}>
          <Share2 className="w-4 h-4" /> Partilhar no WhatsApp
        </Button>
        {vodId && (
          <Link href={`/videos/${vodId}`}>
            <Button variant="outline" className="w-full gap-2"><Video className="w-4 h-4" />Ver VOD</Button>
          </Link>
        )}
        <Link href={`/dashboard/analytics`}>
          <Button variant="ghost" className="w-full gap-2 text-xs"><BarChart3 className="w-4 h-4" />Ver analytics completos</Button>
        </Link>
      </div>
    </div>
  )
}
