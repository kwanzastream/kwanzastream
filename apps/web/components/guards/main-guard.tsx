"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function MainGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push(`/entrar?redirect=${encodeURIComponent(pathname)}`)
        }
    }, [user, isLoading, router, pathname])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">A carregar...</p>
                </div>
            </div>
        )
    }

    if (!user) return null
    return <>{children}</>
}
