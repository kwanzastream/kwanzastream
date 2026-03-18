"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRef, useEffect, useState } from "react"

const TABS = [
  { label: "Início", href: "" },
  { label: "Sobre", href: "/sobre" },
  { label: "Schedule", href: "/schedule" },
  { label: "Vídeos", href: "/videos" },
  { label: "Clips", href: "/clips" },
  { label: "Shorts", href: "/shorts" },
  { label: "Colecções", href: "/colecoes" },
  { label: "Eventos", href: "/eventos" },
]

interface ChannelTabsProps {
  username: string
}

export function ChannelTabs({ username }: ChannelTabsProps) {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  const basePath = `/${username}`

  const isActive = (tabHref: string) => {
    const fullHref = tabHref ? `${basePath}${tabHref}` : basePath
    if (tabHref === "") return pathname === basePath
    return pathname.startsWith(fullHref)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      setShowLeftFade(el.scrollLeft > 8)
      setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
    }
    check()
    el.addEventListener("scroll", check)
    window.addEventListener("resize", check)
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check) }
  }, [])

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Left fade */}
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}

        {/* Scrollable tabs */}
        <div ref={scrollRef} className="flex gap-1 overflow-x-auto scrollbar-none py-1 -mx-1 px-1">
          {TABS.map((tab) => {
            const active = isActive(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href ? `${basePath}${tab.href}` : basePath}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all shrink-0",
                  active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>

        {/* Right fade */}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}
      </div>
    </div>
  )
}
