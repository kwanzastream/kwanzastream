"use client"

import { CampProgressBar } from "./camp-progress-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Lock, ArrowRight } from "lucide-react"

interface CampLevelCardProps {
  level: number
  title: string
  subtitle: string
  totalChapters: number
  completedChapters: number
  isLocked: boolean
  hasCertificate?: boolean
}

export function CampLevelCard({ level, title, subtitle, totalChapters, completedChapters, isLocked, hasCertificate }: CampLevelCardProps) {
  const percentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0
  const gradients = [
    "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    "from-purple-500/10 to-pink-500/10 border-purple-500/20",
    "from-yellow-500/10 to-orange-500/10 border-yellow-500/20",
  ]

  return (
    <div className={`p-5 rounded-2xl border bg-gradient-to-br ${gradients[level - 1] || gradients[0]} ${isLocked ? "opacity-50" : ""} transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Nível {level}</p>
          <h3 className="text-lg font-bold mt-0.5">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {isLocked ? (
          <Lock className="w-5 h-5 text-muted-foreground" />
        ) : hasCertificate ? (
          <Badge className="bg-green-500/10 text-green-400 text-[9px]">✅ Certificado</Badge>
        ) : (
          <GraduationCap className="w-5 h-5 text-primary" />
        )}
      </div>

      <CampProgressBar percentage={percentage} />
      <p className="text-[10px] text-muted-foreground mt-1">{completedChapters}/{totalChapters} capítulos</p>

      {!isLocked && (
        <Link href={`/kwanza-camp/nivel-${level}`}>
          <Button size="sm" className="mt-3 gap-1.5 text-xs" variant={percentage > 0 ? "default" : "outline"}>
            {percentage >= 100 ? "Rever" : percentage > 0 ? "Continuar" : "Começar"}
            <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      )}
    </div>
  )
}
