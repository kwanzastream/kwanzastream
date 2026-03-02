"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface SkeletonProps {
    className?: string
    style?: React.CSSProperties
}

function Skeleton({ className, style }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white/5",
                className
            )}
            style={style}
        />
    )
}

/** Skeleton for a stream/video card */
export function SkeletonCard() {
    return (
        <div className="rounded-xl overflow-hidden border border-white/5 bg-card/30">
            {/* Thumbnail */}
            <Skeleton className="aspect-video w-full" />
            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
            </div>
        </div>
    )
}

/** Skeleton for a user profile header */
export function SkeletonProfile() {
    return (
        <div className="space-y-6">
            {/* Banner */}
            <Skeleton className="h-48 w-full rounded-xl" />
            {/* Avatar + info */}
            <div className="flex gap-4 items-end -mt-12 px-4">
                <Skeleton className="h-24 w-24 rounded-full border-4 border-background flex-shrink-0" />
                <div className="flex-1 space-y-2 pb-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-28" />
                </div>
            </div>
            {/* Bio */}
            <div className="px-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    )
}

/** Skeleton for the feed page (grid of stream cards) */
export function SkeletonFeed() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                </div>
            </div>
            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    )
}

/** Skeleton for chat messages */
export function SkeletonChat() {
    return (
        <div className="space-y-3 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                    <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                    <div className="space-y-1 flex-1">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton
                            className="h-3"
                            style={{ width: `${40 + Math.random() * 50}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

/** Skeleton for the wallet page */
export function SkeletonWallet() {
    return (
        <div className="space-y-6">
            {/* Balance card */}
            <Skeleton className="h-36 w-full rounded-xl" />
            {/* Action buttons */}
            <div className="flex gap-3">
                <Skeleton className="h-12 flex-1 rounded-lg" />
                <Skeleton className="h-12 flex-1 rounded-lg" />
            </div>
            {/* Transaction list */}
            <div className="space-y-3">
                <Skeleton className="h-5 w-36" />
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/5">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-5 w-16" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Skeleton }
