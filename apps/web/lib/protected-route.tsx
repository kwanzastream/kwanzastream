"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function withProtectedRoute<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { isLoggedIn, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isLoggedIn) {
        router.push("/auth")
      }
    }, [isLoggedIn, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      )
    }

    if (!isLoggedIn) {
      return null
    }

    return <Component {...props} />
  }
}
