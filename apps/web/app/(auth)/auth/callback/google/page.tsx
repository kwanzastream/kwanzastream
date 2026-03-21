"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

function GoogleCallbackContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { refreshUser } = useAuth()

    useEffect(() => {
        const token = searchParams.get("token")
        const error = searchParams.get("error")

        if (error) {
            toast.error("Erro ao autenticar com Google")
            router.push("/entrar")
            return
        }

        if (token) {
            // Store token for Next.js middleware (ks_token cookie + localStorage)
            localStorage.setItem("ks_token", token)
            document.cookie = `ks_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
            refreshUser().then(() => {
                toast.success("Bem-vindo ao Kwanza Stream!")
                router.push("/feed")
            }).catch(() => {
                toast.success("Bem-vindo!")
                router.push("/feed")
            })
        } else {
            // No token in URL — try refreshing from httpOnly cookies
            refreshUser().then(() => {
                router.push("/feed")
            }).catch(() => {
                router.push("/entrar")
            })
        }
    }, [searchParams, router, refreshUser])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">A autenticar com Google...</p>
            </div>
        </div>
    )
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <GoogleCallbackContent />
        </Suspense>
    )
}
