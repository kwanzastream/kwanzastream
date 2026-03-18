"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function FeedPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    // No session → public homepage
    if (!isAuthenticated) {
      router.replace("/")
      return
    }

    // Onboarding incomplete (e.g. Google OAuth users) → interests (review correction #1)
    // @ts-ignore — hasCompletedOnboarding may not exist on type yet
    if (user && user.hasCompletedOnboarding === false) {
      router.replace("/registar/interesses")
      return
    }

    // New user with no follows → discovery
    // @ts-ignore — followingCount may not exist on type yet
    const followingCount = user?.followingCount ?? user?.following?.length ?? 0
    if (followingCount === 0) {
      router.replace("/feed/explorar")
      return
    }

    // Established user → personalized feed
    router.replace("/feed/para-ti")
  }, [isLoading, isAuthenticated, user, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  )
}
