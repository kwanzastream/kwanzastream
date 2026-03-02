export default function NotificationsLoading() {
    return (
        <div className="min-h-screen bg-background flex flex-col max-w-2xl mx-auto w-full md:border-x border-white/10">
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 md:px-6">
                <div className="h-6 w-40 bg-white/5 rounded animate-pulse" />
            </header>
            <div className="border-b border-white/10 h-14 flex">
                <div className="flex-1 flex items-center justify-center">
                    <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                </div>
            </div>
            <div className="space-y-1">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 md:px-6 flex gap-4 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-white/5 rounded w-3/4" />
                            <div className="h-3 bg-white/5 rounded w-1/2" />
                            <div className="h-2 bg-white/5 rounded w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
