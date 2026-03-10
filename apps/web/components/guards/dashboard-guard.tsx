"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DashboardGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/entrar")
        }
    }, [user, isLoading, router])

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><span>A carregar...</span></div>
    if (!user) return null

    return <>{children}</>
}
