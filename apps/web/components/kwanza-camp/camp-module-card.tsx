"use client"

import { CampProgressBar } from "./camp-progress-bar"
import { Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CampModuleCardProps {
  levelSlug: string
  slug: string
  title: string
  chapterCount: number
  completedCount: number
  duration: number
  isLocked: boolean
  index: number
}

export function CampModuleCard({ levelSlug, slug, title, chapterCount, completedCount, duration, isLocked, index }: CampModuleCardProps) {
  const percentage = chapterCount > 0 ? Math.round((completedCount / chapterCount) * 100) : 0
  const icons = ["📡", "🎙️", "💬", "📈", "💰", "🎬", "📊", "🏪", "🎨"]

  return (
    <div className={`p-4 rounded-xl border border-white/10 ${isLocked ? "opacity-50" : "hover:border-white/20"} transition-all`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[index] || "📚"}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-[10px] text-muted-foreground">{chapterCount} capítulos · ~{duration}min</p>
          {!isLocked && completedCount > 0 && (
            <div className="mt-2">
              <CampProgressBar percentage={percentage} size="sm" />
            </div>
          )}
        </div>
        <div className="shrink-0">
          {isLocked ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Link href={`/kwanza-camp/${levelSlug}/${slug}`}>
              <Button size="sm" variant="outline" className="text-[10px] h-7 gap-1">
                {percentage >= 100 ? "Rever" : percentage > 0 ? "Continuar" : "Começar"}
                <ArrowRight className="w-2.5 h-2.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
