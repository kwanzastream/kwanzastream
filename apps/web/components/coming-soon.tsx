"use client"

import { Construction, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ComingSoonProps {
  /** Page title displayed at the top */
  title: string
  /** Optional description text */
  description?: string
  /** Optional icon emoji or text shown above the title */
  icon?: string
  /** Show "Voltar" back button. Default: true */
  showBack?: boolean
}

export function ComingSoon({
  title,
  description,
  icon = "🚧",
  showBack = true,
}: ComingSoonProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4 text-center">
      {/* Animated icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center text-3xl">
          {icon}
        </div>
      </div>

      {/* Title + description */}
      <div className="space-y-2 max-w-sm">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description || "Esta secção está a ser preparada. Volta em breve para novidades!"}
        </p>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
        <Construction className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-medium text-primary">Em desenvolvimento</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Voltar
          </button>
        )}
        <Link
          href="/explorar"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="w-3 h-3" /> Explorar
        </Link>
      </div>
    </div>
  )
}
