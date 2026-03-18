"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Lock } from "lucide-react"

export default function ChannelSeguidoresPage() {
  const { username } = useParams()
  const [followers, setFollowers] = useState<any[]>([])
  const [isPrivate, setIsPrivate] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then((res) => {
      const u = res.data.user
      setTotalCount(u?.followersCount || 0)
      // Check privacy setting
      if (u?.settings?.publicFollowerList === false) {
        setIsPrivate(true)
        setLoading(false)
        return
      }
      // Fetch followers list
      api.get(`/api/users/${u?.id}/followers`).then((r) => {
        setFollowers(r.data?.followers || r.data || [])
      }).catch(() => {}).finally(() => setLoading(false))
    }).catch(() => setLoading(false))
  }, [username])

  if (loading) return <div className="py-12 text-center text-muted-foreground">A carregar...</div>

  // Privacy check
  if (isPrivate) {
    return (
      <div className="text-center py-16">
        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Lista privada</p>
        <p className="text-sm text-muted-foreground mt-1">@{username} optou por não mostrar a lista de seguidores</p>
        <p className="text-lg font-bold mt-4">{totalCount.toLocaleString("pt-AO")} seguidores</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Seguidores</h2>
        <span className="text-sm text-muted-foreground">{totalCount.toLocaleString("pt-AO")} total</span>
      </div>
      {followers.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem seguidores ainda</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {followers.map((f: any) => (
            <div key={f.id} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
              <Avatar className="w-12 h-12">
                <AvatarImage src={f.avatarUrl} />
                <AvatarFallback className="text-sm bg-primary/20 text-primary">{(f.displayName || f.username || "?").slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium truncate w-full text-center">@{f.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
