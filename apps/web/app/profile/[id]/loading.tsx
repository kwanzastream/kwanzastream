import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Skeleton className="h-48 w-full" />
            <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <Skeleton className="h-28 w-28 rounded-full ring-4 ring-[#050505]" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="rounded-xl border border-white/10 bg-card/50 p-4 text-center">
                            <Skeleton className="h-7 w-12 mx-auto mb-2" />
                            <Skeleton className="h-3 w-16 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
