"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Bell, Users, Zap, Crown, Radio, AtSign, Info, Trash2, CheckCheck, Swords, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

interface Notification { id: string; type: string; isRead: boolean; createdAt: string; data: { actorName?: string; actorUsername?: string; actorAvatar?: string; streamTitle?: string; amount?: number; message?: string; clipTitle?: string; channelUrl?: string } }

const NC: Record<string, { icon: any; color: string; label: (d: Notification["data"]) => string; href: (d: Notification["data"]) => string }> = {
  FOLLOW: { icon: Users, color: "text-blue-400", label: (d) => `@${d.actorUsername} começou a seguir-te`, href: (d) => `/${d.actorUsername}` },
  DONATION: { icon: Zap, color: "text-[#F9D616]", label: (d) => `@${d.actorUsername} enviou-te ${d.amount} Salos${d.message ? ` — "${d.message}"` : ""}`, href: (d) => `/${d.actorUsername}` },
  SUBSCRIPTION: { icon: Crown, color: "text-purple-400", label: (d) => `@${d.actorUsername} subscreveu o teu canal`, href: (d) => `/${d.actorUsername}` },
  STREAM_LIVE: { icon: Radio, color: "text-[#CE1126]", label: (d) => `@${d.actorUsername} está ao vivo${d.streamTitle ? ` — ${d.streamTitle}` : ""}`, href: (d) => `/stream/${d.actorUsername}` },
  MENTION: { icon: AtSign, color: "text-green-400", label: (d) => `@${d.actorUsername} mencionou-te no chat`, href: (d) => d.channelUrl || `/${d.actorUsername}` },
  RAID: { icon: Swords, color: "text-orange-400", label: (d) => `@${d.actorUsername} fez raid para o teu canal`, href: (d) => `/stream/${d.actorUsername}` },
  CLIP_FEATURED: { icon: Star, color: "text-yellow-400", label: (d) => `O teu clip "${d.clipTitle}" foi destacado`, href: () => `/dashboard/content/clips` },
  SYSTEM: { icon: Info, color: "text-muted-foreground", label: (d) => d.message || "Notificação do sistema", href: () => `/` },
}

export default function NotificacoesPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)

  const fetchNotifs = useCallback(async () => {
    try { const res = await api.get("/api/notifications/"); setNotifications(res.data?.notifications || res.data || []) }
    catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchNotifs() }, [fetchNotifs])

  const handleMarkAllRead = async () => {
    setMarking(true)
    try { await api.post("/api/notifications/mark-read", { ids: notifications.filter((n) => !n.isRead).map((n) => n.id) }); setNotifications((p) => p.map((n) => ({ ...n, isRead: true }))); toast.success("Marcadas como lidas") }
    catch { toast.error("Erro ao marcar") } finally { setMarking(false) }
  }

  const handleMarkRead = async (id: string) => { try { await api.post("/api/notifications/mark-read", { ids: [id] }); setNotifications((p) => p.map((n) => n.id === id ? { ...n, isRead: true } : n)) } catch {} }
  const handleDelete = async (id: string) => { try { await api.delete(`/api/notifications/${id}`); setNotifications((p) => p.filter((n) => n.id !== id)) } catch { toast.error("Erro ao apagar") } }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const NotifItem = ({ notif }: { notif: Notification }) => {
    const cfg = NC[notif.type] ?? NC.SYSTEM; const Icon = cfg.icon
    return (
      <div className={`flex items-start gap-3 p-3.5 rounded-xl transition-colors group cursor-pointer ${notif.isRead ? "opacity-70 hover:opacity-100" : "bg-primary/5 border border-primary/10"}`} onClick={() => { if (!notif.isRead) handleMarkRead(notif.id); router.push(cfg.href(notif.data)) }}>
        {notif.data.actorAvatar ? <div className="relative shrink-0"><Avatar className="w-9 h-9"><AvatarImage src={notif.data.actorAvatar} /><AvatarFallback className="text-xs">{notif.data.actorName?.slice(0, 2)}</AvatarFallback></Avatar><div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background flex items-center justify-center"><Icon className={`w-2.5 h-2.5 ${cfg.color}`} /></div></div>
        : <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0"><Icon className={`w-4 h-4 ${cfg.color}`} /></div>}
        <div className="flex-1 min-w-0"><p className="text-sm leading-snug">{cfg.label(notif.data)}</p><p className="text-xs text-muted-foreground mt-0.5">{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: pt })}</p></div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}><Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => handleDelete(notif.id)}><Trash2 className="w-3.5 h-3.5" /></Button></div>
        {!notif.isRead && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
      </div>
    )
  }

  const unread = notifications.filter((n) => !n.isRead)
  const social = notifications.filter((n) => ["FOLLOW", "MENTION", "RAID"].includes(n.type))
  const financial = notifications.filter((n) => ["DONATION", "SUBSCRIPTION"].includes(n.type))

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><h1 className="text-xl font-bold">Notificações</h1>{unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount}</Badge>}</div>
        {unreadCount > 0 && <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={handleMarkAllRead} disabled={marking}><CheckCheck className="w-3.5 h-3.5" />Marcar todas</Button>}
      </div>
      <Tabs defaultValue="todas">
        <TabsList className="w-full"><TabsTrigger value="todas" className="flex-1 text-xs">Todas</TabsTrigger><TabsTrigger value="nao-lidas" className="flex-1 text-xs">Não lidas{unreadCount > 0 && <Badge className="ml-1.5 h-4 text-[10px] px-1">{unreadCount}</Badge>}</TabsTrigger><TabsTrigger value="social" className="flex-1 text-xs">Social</TabsTrigger><TabsTrigger value="financeiro" className="flex-1 text-xs">Ganhos</TabsTrigger></TabsList>
        {[{ v: "todas", d: notifications }, { v: "nao-lidas", d: unread }, { v: "social", d: social }, { v: "financeiro", d: financial }].map(({ v, d }) => (
          <TabsContent key={v} value={v}>
            {loading ? <div className="space-y-2 mt-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div> : d.length === 0 ? <div className="text-center py-16"><Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" /><p className="text-sm text-muted-foreground">Sem notificações</p></div> : <div className="space-y-1 mt-3">{d.map((n) => <NotifItem key={n.id} notif={n} />)}</div>}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
