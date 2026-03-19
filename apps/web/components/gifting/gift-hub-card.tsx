"use client"

import { Gift, Heart } from "lucide-react"
import Link from "next/link"

interface GiftHubCardProps {
  type: "subscription" | "salos"
  title: string
  description: string
  href: string
}

export function GiftHubCard({ type, title, description, href }: GiftHubCardProps) {
  return (
    <Link href={href} className="block">
      <div className="p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all bg-card space-y-3 group">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          {type === "subscription" ? <Gift className="w-6 h-6 text-primary" /> : <Heart className="w-6 h-6 text-yellow-400" />}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
