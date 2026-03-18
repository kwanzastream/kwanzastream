"use client"

import { useRef, useEffect, useCallback } from "react"
import { Loader2 } from "lucide-react"

interface InfiniteScrollProps {
  onLoadMore: () => void
  hasMore: boolean
  loading?: boolean
  className?: string
  children: React.ReactNode
}

export function InfiniteScroll({ onLoadMore, hasMore, loading = false, className = "", children }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false) // prevent multiple simultaneous triggers

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
        loadingRef.current = true
        onLoadMore()
        // Reset after a tick to allow state to update
        setTimeout(() => { loadingRef.current = false }, 500)
      }
    },
    [hasMore, onLoadMore]
  )

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(handleIntersect, { rootMargin: "200px" })
    observer.observe(el)
    return () => observer.disconnect()
  }, [handleIntersect])

  // Sync loading ref with prop
  useEffect(() => { loadingRef.current = loading }, [loading])

  return (
    <div className={className}>
      {children}
      {/* Sentinel for IntersectionObserver */}
      <div ref={sentinelRef} className="h-1" />
      {loading && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-xs text-muted-foreground py-8">
          Chegaste ao fim 🇦🇴
        </p>
      )}
    </div>
  )
}
