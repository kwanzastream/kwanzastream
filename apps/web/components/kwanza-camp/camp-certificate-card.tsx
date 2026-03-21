"use client"

import { Award, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const LEVEL_NAMES: Record<number, string> = {
  1: "Começa a Transmitir",
  2: "Cresce o teu Canal",
  3: "Torna-te Partner",
}

interface CampCertificateCardProps {
  certCode: string
  level: number
  issuedAt: string
  username: string
  displayName?: string
}

export function CampCertificateCard({ certCode, level, issuedAt, username, displayName }: CampCertificateCardProps) {
  const gradients = [
    "from-blue-500/10 to-cyan-500/10 border-blue-500/30",
    "from-purple-500/10 to-pink-500/10 border-purple-500/30",
    "from-yellow-500/10 to-orange-500/10 border-yellow-500/30",
  ]

  return (
    <div className={`p-6 rounded-2xl border bg-gradient-to-br ${gradients[level - 1]} text-center space-y-3`}>
      <Award className="w-10 h-10 text-yellow-400 mx-auto" />
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Kwanza Stream</p>
      <p className="text-[10px] text-muted-foreground">Certifica que</p>
      <p className="text-lg font-bold">@{username}</p>
      <p className="text-[10px] text-muted-foreground">completou com sucesso</p>
      <p className="text-base font-semibold">NÍVEL {level} — {LEVEL_NAMES[level]}</p>
      <p className="text-[10px] text-muted-foreground">Kwanza Camp 2026</p>
      <p className="text-xs text-muted-foreground">{new Date(issuedAt).toLocaleDateString("pt-AO", { day: "numeric", month: "long", year: "numeric" })}</p>
      <p className="text-[9px] text-muted-foreground font-mono">#{certCode}</p>

      <div className="flex gap-2 justify-center pt-2">
        <Button variant="outline" size="sm" className="text-[10px] gap-1" onClick={() => {
          navigator.share?.({ url: `${window.location.origin}/kwanza-camp/certificados/${certCode}`, title: `Certificado Kwanza Camp — Nível ${level}` })
        }}>
          <Share2 className="w-3 h-3" />WhatsApp
        </Button>
        <Button variant="outline" size="sm" className="text-[10px] gap-1">
          <Download className="w-3 h-3" />PNG
        </Button>
      </div>
    </div>
  )
}
