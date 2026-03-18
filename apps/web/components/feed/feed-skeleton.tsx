"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface FeedSkeletonProps {
  variant?: "grid" | "rail" | "vertical"
  count?: number
  className?: string
}

export function FeedSkeleton({ variant = "grid", count = 8, className = "" }: FeedSkeletonProps) {
  if (variant === "rail") {
    return (
      <div className={`flex gap-3 overflow-hidden px-4 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shrink-0 w-28">
            <Skeleton className="aspect-video rounded-lg" />
            <div className="flex items-center gap-1.5 mt-1.5"><Skeleton className="w-5 h-5 rounded-full" /><Skeleton className="h-2.5 w-16" /></div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "vertical") {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden"><Skeleton className="aspect-[9/16]" /></div>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
          <Skeleton className="aspect-video" />
          <div className="p-3 flex gap-2.5">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
          </div>
        </div>
      ))}
    </div>
  )
}
