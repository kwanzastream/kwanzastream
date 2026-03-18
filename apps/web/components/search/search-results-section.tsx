"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SearchResultsSectionProps {
  title: string
  icon?: React.ReactNode
  count: number
  viewAllHref?: string
  children: React.ReactNode
  className?: string
}

export function SearchResultsSection({ title, icon, count, viewAllHref, children, className = "" }: SearchResultsSectionProps) {
  if (count === 0) return null
  return (
    <section className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2">{icon}{title}<span className="text-muted-foreground font-normal">({count})</span></h3>
        {viewAllHref && count > 3 && (
          <Link href={viewAllHref} className="text-xs text-primary flex items-center gap-1 hover:underline">Ver todos <ArrowRight className="w-3 h-3" /></Link>
        )}
      </div>
      {children}
    </section>
  )
}
