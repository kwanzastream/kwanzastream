"use client"
import Link from "next/link"

interface ErrorPageLayoutProps {
  code?: number
  icon: string
  title: string
  description: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  showSystemStatus?: boolean
  children?: React.ReactNode
}

export function ErrorPageLayout({ code, icon, title, description, primaryAction, secondaryAction, showSystemStatus, children }: ErrorPageLayoutProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        {code && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">{icon}</span>
            <span className="text-3xl font-black text-muted-foreground">{code}</span>
          </div>
        )}
        {!code && <div className="text-5xl">{icon}</div>}
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{description}</p>
        </div>
        {children}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {primaryAction && <Link href={primaryAction.href} className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">{primaryAction.label}</Link>}
          {secondaryAction && <Link href={secondaryAction.href} className="px-5 py-2.5 rounded-xl border border-white/10 text-xs hover:bg-white/5 transition-colors">{secondaryAction.label}</Link>}
        </div>
        {showSystemStatus && <p className="text-[9px] text-muted-foreground">Estado do sistema: <Link href="/suporte/estado-sistema" className="text-primary hover:underline">Verificar →</Link></p>}
      </div>
    </div>
  )
}
