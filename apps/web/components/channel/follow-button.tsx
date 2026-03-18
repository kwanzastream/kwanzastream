"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Heart, Loader2 } from "lucide-react"

interface FollowButtonProps {
  channelId: string
  username: string
  initialFollowing?: boolean
  size?: "sm" | "default" | "lg"
  className?: string
}

export function FollowButton({ channelId, username, initialFollowing = false, size = "sm", className }: FollowButtonProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push(`/registar?redirectTo=/${username}`)
      return
    }
    setLoading(true)
    try {
      if (isFollowing) {
        await api.delete(`/api/users/${channelId}/follow`)
        setIsFollowing(false)
        toast.success(`Deixaste de seguir @${username}`)
      } else {
        await api.post(`/api/users/${channelId}/follow`)
        setIsFollowing(true)
        toast.success(`Estás a seguir @${username}! 🎉`)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size={size}
      variant={isFollowing ? "outline" : "default"}
      onClick={handleClick}
      disabled={loading}
      className={`gap-1.5 ${className || ""}`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Heart className={`w-3.5 h-3.5 ${isFollowing ? "fill-current text-red-500" : ""}`} />
      )}
      {isFollowing ? "A seguir" : "Seguir"}
    </Button>
  )
}
