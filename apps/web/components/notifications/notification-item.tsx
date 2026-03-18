"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, Zap, Crown, Radio, AtSign, Swords, Star, Info, Shield, Trophy, CreditCard, Bell, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

export interface Notification {
  id: string
  type: string
  isRead: boolean
  createdAt: string
  data: {
    actorName?: string; actorUsername?: string; actorAvatar?: string
    streamTitle?: string; amount?: number; message?: string
    clipTitle?: string; channelUrl?: string; achievementName?: string
    tournamentName?: string
  }
}

const TYPE_CONFIG: Record<string, { icon: any; color: string; label: (d: Notification["data"]) => string; href: (d: Notification["data"]) => string }> = {
  FOLLOW: { icon: Users, color: "text-blue-400", label: (d) => `@${d.actorUsername} começou a seguir-te`, href: (d) => `/${d.actorUsername}` },
  DONATION: { icon: Zap, color: "text-[#F9D616]", label: (d) => `@${d.actorUsername} enviou-te ${d.amount} Salos${d.message ? ` — "${d.message}"` : ""}`, href: (d) => `/${d.actorUsername}` },
  SUBSCRIPTION: { icon: Crown, color: "text-purple-400", label: (d) => `@${d.actorUsername} subscreveu o teu canal`, href: (d) => `/${d.actorUsername}` },
  STREAM_LIVE: { icon: Radio, color: "text-[#CE1126]", label: (d) => `@${d.actorUsername} está ao vivo${d.streamTitle ? ` — ${d.streamTitle}` : ""}`, href: (d) => `/stream/${d.actorUsername}` },
  MENTION: { icon: AtSign, color: "text-green-400", label: (d) => `@${d.actorUsername} mencionou-te no chat`, href: (d) => d.channelUrl || `/${d.actorUsername}` },
  RAID: { icon: Swords, color: "text-orange-400", label: (d) => `@${d.actorUsername} fez raid para o teu canal`, href: (d) => `/stream/${d.actorUsername}` },
  CLIP_FEATURED: { icon: Star, color: "text-yellow-400", label: (d) => `O teu clip "${d.clipTitle}" foi destacado`, href: () => `/dashboard/content/clips` },
  SYSTEM: { icon: Info, color: "text-muted-foreground", label: (d) => d.message || "Notificação do sistema", href: () => `/` },
  PAYOUT: { icon: CreditCard, color: "text-green-500", label: (d) => d.message || "Payout processado", href: () => `/wallet/historico` },
  PAYOUT_FAILED: { icon: CreditCard, color: "text-red-400", label: (d) => d.message || "Payout falhado", href: () => `/wallet/historico` },
  MODERATION_REPORT: { icon: Shield, color: "text-red-400", label: (d) => d.message || "Report recebido no teu canal", href: () => `/dashboard/comunidade/moderadores` },
  MODERATION_AUTOMOD: { icon: Shield, color: "text-amber-400", label: (d) => d.message || "Mensagem eliminada por AutoMod", href: () => `/dashboard/comunidade/moderadores` },
  MODERATION_BAN: { icon: Shield, color: "text-red-500", label: (d) => d.message || "Utilizador banido", href: () => `/dashboard/comunidade/banidos` },
  MODERATION_WARNING: { icon: Shield, color: "text-orange-400", label: (d) => d.message || "Aviso recebido da plataforma", href: () => `/dashboard` },
  ACHIEVEMENT: { icon: Trophy, color: "text-amber-400", label: (d) => `Conquista desbloqueada: ${d.achievementName || "Nova conquista!"}`, href: () => `/dashboard` },
  TOURNAMENT_SIGNUP: { icon: Trophy, color: "text-primary", label: (d) => `Inscrição confirmada: ${d.tournamentName || "Torneio"}`, href: () => `/feed/eventos` },
  TOURNAMENT_STARTING: { icon: Trophy, color: "text-[#CE1126]", label: (d) => `${d.tournamentName || "Torneio"} começa em 1 hora!`, href: () => `/feed/eventos` },
  TOURNAMENT_RESULT: { icon: Trophy, color: "text-amber-400", label: (d) => d.message || "Resultado de torneio disponível", href: () => `/feed/eventos` },
}

interface NotificationItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
  grouped?: { count: number; actors: string[] }
}

export function NotificationItem({ notification: n, onMarkRead, onDelete, grouped }: NotificationItemProps) {
  const router = useRouter()
  const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.SYSTEM
  const Icon = cfg.icon

  const handleClick = () => {
    if (!n.isRead) onMarkRead(n.id)
    router.push(cfg.href(n.data))
  }

  const label = grouped && grouped.count > 1
    ? `${grouped.actors.slice(0, 2).map(a => `@${a}`).join(", ")} e mais ${grouped.count - 2} ${cfg.label(n.data).split(" ").slice(-1)[0]}`
    : cfg.label(n.data)

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-xl transition-colors group cursor-pointer ${n.isRead ? "opacity-70 hover:opacity-100" : "bg-primary/5 border border-primary/10"}`}
      onClick={handleClick}
    >
      {n.data.actorAvatar ? (
        <div className="relative shrink-0">
          <Avatar className="w-9 h-9"><AvatarImage src={n.data.actorAvatar} /><AvatarFallback className="text-xs">{n.data.actorName?.slice(0, 2)}</AvatarFallback></Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background flex items-center justify-center"><Icon className={`w-2.5 h-2.5 ${cfg.color}`} /></div>
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0"><Icon className={`w-4 h-4 ${cfg.color}`} /></div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: pt })}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => onDelete(n.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
      </div>
      {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
    </div>
  )
}

// Category constants for filtering
export const STREAM_TYPES = ["STREAM_LIVE", "CLIP_FEATURED", "RAID"]
export const SOCIAL_TYPES = ["FOLLOW", "MENTION"]
export const SYSTEM_TYPES = ["SYSTEM"]
export const PAYMENT_TYPES = ["DONATION", "SUBSCRIPTION", "PAYOUT", "PAYOUT_FAILED"]
export const MODERATION_TYPES = ["MODERATION_REPORT", "MODERATION_AUTOMOD", "MODERATION_BAN", "MODERATION_WARNING"]
export const ACHIEVEMENT_TYPES = ["ACHIEVEMENT"]
export const TOURNAMENT_TYPES = ["TOURNAMENT_SIGNUP", "TOURNAMENT_STARTING", "TOURNAMENT_RESULT"]
