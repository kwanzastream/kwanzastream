"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Play, Zap, Share2, MoreHorizontal, Flag, Copy, ExternalLink, Ban } from "lucide-react"
import { SubscribeModal } from "./subscribe-modal"
import { SalosModal } from "./salos-modal"

interface ChannelHeaderActionsProps {
  channelId: string
  username: string
  monetizationActive?: boolean
}

export function ChannelHeaderActions({ channelId, username, monetizationActive }: ChannelHeaderActionsProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [showSalosModal, setShowSalosModal] = useState(false)

  const isOwnChannel = user?.username === username

  // Fetch follow state + live status
  useEffect(() => {
    if (isAuthenticated && channelId) {
      api.get(`/api/users/${channelId}`).then((res) => {
        setIsFollowing(res.data.user?.isFollowing || false)
      }).catch(() => {})
    }

    // Check live status
    api.get(`/api/streams/user/${channelId}`).then((res) => {
      const streams = res.data?.streams || res.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (live) {
        setIsLive(true)
        setViewerCount(live.viewerCount || 0)
      }
    }).catch(() => {})
  }, [channelId, isAuthenticated])

  const handleFollow = async () => {
    if (!isAuthenticated) {
      router.push(`/registar?redirectTo=/${username}`)
      return
    }
    setFollowLoading(true)
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
      toast.error(err?.response?.data?.message || "Erro ao actualizar follow")
    } finally {
      setFollowLoading(false)
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/${username}`
    try {
      if (navigator.share) {
        await navigator.share({ title: `@${username} no Kwanza Stream`, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success("Link copiado!")
      }
    } catch {
      await navigator.clipboard.writeText(url)
      toast.success("Link copiado!")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mb-2">
      {/* Live indicator */}
      {isLive && (
        <div className="mb-3 flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1.5 bg-[#CE1126] text-white px-2.5 py-1 rounded-md font-bold text-xs animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full" /> AO VIVO
          </span>
          <span className="text-muted-foreground">{viewerCount.toLocaleString("pt-AO")} espectadores</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {isOwnChannel ? (
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
            Gerir canal
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant={isFollowing ? "outline" : "default"}
              onClick={handleFollow}
              disabled={followLoading}
              className="gap-1.5"
            >
              <Heart className={`w-3.5 h-3.5 ${isFollowing ? "fill-current text-red-500" : ""}`} />
              {isFollowing ? "A seguir" : "Seguir"}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => isAuthenticated ? setShowSubscribeModal(true) : router.push(`/registar?redirectTo=/${username}`)}
              className="gap-1.5"
            >
              Subscrever
            </Button>

            {monetizationActive && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => isAuthenticated ? setShowSalosModal(true) : router.push(`/registar?redirectTo=/${username}`)}
                className="gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Salos
              </Button>
            )}

            {isLive && (
              <Button
                size="sm"
                className="gap-1.5 bg-[#CE1126] hover:bg-[#CE1126]/90"
                onClick={() => router.push(`/stream/${username}`)}
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Ver stream
              </Button>
            )}
          </>
        )}

        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              <Copy className="w-3.5 h-3.5 mr-2" /> Copiar link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Vê este canal no Kwanza Stream: ${window.location.origin}/${username}`)}`, "_blank")}>
              <ExternalLink className="w-3.5 h-3.5 mr-2" /> Partilhar no WhatsApp
            </DropdownMenuItem>
            {isLive && (
              <DropdownMenuItem onClick={() => router.push(`/stream/${username}`)}>
                <Play className="w-3.5 h-3.5 mr-2" /> Abrir stream
              </DropdownMenuItem>
            )}
            {!isOwnChannel && (
              <>
                <DropdownMenuItem onClick={() => router.push(`/report?target=${channelId}&type=USER`)}>
                  <Flag className="w-3.5 h-3.5 mr-2" /> Denunciar canal
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Ban className="w-3.5 h-3.5 mr-2" /> Bloquear
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Modals */}
      <SubscribeModal
        open={showSubscribeModal}
        onClose={() => setShowSubscribeModal(false)}
        username={username}
        channelId={channelId}
      />
      <SalosModal
        open={showSalosModal}
        onClose={() => setShowSalosModal(false)}
        username={username}
        channelId={channelId}
      />
    </div>
  )
}
