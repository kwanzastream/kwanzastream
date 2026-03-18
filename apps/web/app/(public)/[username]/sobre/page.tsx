"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { Users, Eye, Clock, Calendar, Instagram, Youtube, ExternalLink } from "lucide-react"

export default function ChannelSobrePage() {
  const { username } = useParams()
  const [channel, setChannel] = useState<any>(null)

  useEffect(() => {
    api.get(`/api/users/${username}`).then((res) => setChannel(res.data.user)).catch(() => {})
  }, [username])

  if (!channel) return <div className="py-12 text-center text-muted-foreground">A carregar...</div>

  const stats = [
    { label: "Seguidores", value: (channel.followersCount || 0).toLocaleString("pt-AO") },
    { label: "A seguir", value: (channel.followingCount || 0).toLocaleString("pt-AO") },
    { label: "Streams", value: (channel.streamsCount || 0).toLocaleString("pt-AO") },
  ]

  return (
    <div className="max-w-3xl space-y-8">
      {/* Bio */}
      {channel.bio && (
        <section>
          <h2 className="font-semibold text-lg mb-2">Sobre</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{channel.bio}</p>
        </section>
      )}

      {/* Stats */}
      <section>
        <h2 className="font-semibold text-lg mb-3">Estatísticas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social links */}
      {channel.socialLinks && Object.keys(channel.socialLinks).length > 0 && (
        <section>
          <h2 className="font-semibold text-lg mb-3">Redes sociais</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(channel.socialLinks).map(([platform, url]) => (
              <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-sm transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                {platform}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Member since */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Membro desde</h2>
        <p className="text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(channel.createdAt).toLocaleDateString("pt-AO", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </section>

      {/* Categories */}
      {channel.categories?.length > 0 && (
        <section>
          <h2 className="font-semibold text-lg mb-2">Categorias habituais</h2>
          <div className="flex flex-wrap gap-2">
            {channel.categories.map((cat: string) => (
              <span key={cat} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">{cat}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
