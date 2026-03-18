"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FeedEmptyStateProps {
  icon?: React.ReactNode
  emoji?: string
  title: string
  description: string
  actions?: { label: string; href: string; variant?: "default" | "outline" | "ghost" }[]
  className?: string
}

export function FeedEmptyState({ icon, emoji, title, description, actions, className = "" }: FeedEmptyStateProps) {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      {emoji && <p className="text-4xl mb-3">{emoji}</p>}
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">{description}</p>
      {actions && actions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          {actions.map((a, i) => (
            <Link key={i} href={a.href}>
              <Button variant={a.variant || (i === 0 ? "default" : "outline")} size="sm">{a.label}</Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
