import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Eye, ExternalLink, Calendar, Shield } from "lucide-react"
import Link from "next/link"

interface StreamInfoPanelProps {
  title: string
  category: string
  tags?: string[]
  description?: string
  startedAt?: string
  contentRating?: "general" | "13+" | "18+"
  socialLinks?: Record<string, string>
  viewerCount: number
}

export function StreamInfoPanel({
  title, category, tags = [], description, startedAt, contentRating = "general",
  socialLinks, viewerCount,
}: StreamInfoPanelProps) {
  const uptime = startedAt ? (() => {
    const diff = Date.now() - new Date(startedAt).getTime()
    const h = Math.floor(diff / 3600000); const m = Math.floor((diff % 3600000) / 60000)
    return h > 0 ? `${h}h ${m}min` : `${m} min`
  })() : null

  const RATING_STYLES: Record<string, string> = {
    "general": "bg-green-500/20 text-green-400",
    "13+": "bg-amber-500/20 text-amber-400",
    "18+": "bg-red-500/20 text-red-400",
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="font-bold text-lg leading-tight">{title}</h2>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <Badge variant="secondary" className="text-xs bg-white/10 border-none">{category}</Badge>
          <Badge className={`text-[10px] border-none ${RATING_STYLES[contentRating]}`}>{contentRating === "general" ? "Geral" : contentRating}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Eye className="w-3 h-3" /> {viewerCount.toLocaleString("pt-AO")} a ver
          </span>
          {uptime && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {uptime}
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="secondary" className="text-[10px] bg-white/5 hover:bg-white/10 border-none cursor-pointer">
                <Tag className="w-2.5 h-2.5 mr-0.5" />{tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-semibold mb-2">Sobre esta Live</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{description}</p>
        </div>
      )}

      {/* Social links */}
      {socialLinks && Object.keys(socialLinks).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Redes sociais</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs transition-colors">
                <ExternalLink className="w-3 h-3" /> {platform}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
