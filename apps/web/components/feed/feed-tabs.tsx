"use client"

import { useRef, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

interface Tab {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
}

interface FeedTabsProps {
  tabs: Tab[]
  className?: string
}

export function FeedTabs({ tabs, className = "" }: FeedTabsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  // Scroll active tab into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const el = activeRef.current
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
      container.scrollTo({ left, behavior: "smooth" })
    }
  }, [pathname])

  return (
    <div className={`sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/10 ${className}`}>
      <div ref={scrollRef} className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-4 py-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/feed" && pathname?.startsWith(tab.href))
          return (
            <button
              key={tab.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => router.push(tab.href)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
