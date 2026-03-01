"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
    return (
        <div className="min-h-screen bg-background p-6 space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-[300px] rounded-xl" />
        </div>
    )
}
