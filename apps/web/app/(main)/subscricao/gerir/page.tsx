"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Subscription { id: string; tier: string; active: boolean; startedAt: string; expiresAt: string; amount: number; creator: { id: string; username: string; displayName: string; avatarUrl?: string } }

export default function GerirSubscricoesPage() {
  const [subs, setSubs] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/subscriptions/me")
      .then((res) => setSubs(res.data?.subscriptions || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async (sub: Subscription) => {
    if (!confirm(`Cancelar subscrição de @${sub.creator.username}?`)) return
    try { await api.delete(`/api/subscriptions/${sub.id}`); setSubs((prev) => prev.map((s) => s.id === sub.id ? { ...s, active: false } : s)); toast.success("Subscrição cancelada") }
    catch { toast.error("Erro ao cancelar") }
  }

  const active = subs.filter((s) => s.active); const inactive = subs.filter((s) => !s.active)

  const SubCard = ({ sub }: { sub: Subscription }) => (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:bg-muted/20">
      <Link href={`/${sub.creator.username}`}><Avatar className="w-12 h-12"><AvatarImage src={sub.creator.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{sub.creator.displayName?.slice(0, 2)}</AvatarFallback></Avatar></Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2"><p className="font-medium truncate">{sub.creator.displayName}</p><Badge variant="outline" className={`text-[10px] shrink-0 ${sub.tier === "VIP" ? "border-[#F9D616]/50 text-[#F9D616]" : ""}`}>{sub.tier === "VIP" ? "👑" : "❤️"} {sub.tier}</Badge></div>
        <div className="flex items-center gap-3 mt-0.5"><p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{sub.active ? `Renova ${new Date(sub.expiresAt).toLocaleDateString("pt-AO")}` : `Expirou ${new Date(sub.expiresAt).toLocaleDateString("pt-AO")}`}</p><p className="text-xs text-muted-foreground">{(Number(sub.amount) / 100).toLocaleString("pt-AO")} Kz/mês</p></div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link href={`/${sub.creator.username}`}><Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="w-3.5 h-3.5" /></Button></Link>
        {sub.active && <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive" onClick={() => handleCancel(sub)}>Cancelar</Button>}
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">As minhas subscrições</h1>
      <Tabs defaultValue="activas">
        <TabsList><TabsTrigger value="activas">Activas ({active.length})</TabsTrigger><TabsTrigger value="historico">Histórico ({inactive.length})</TabsTrigger></TabsList>
        <TabsContent value="activas">
          {loading ? <div className="space-y-3 mt-3">{Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
          : active.length === 0 ? <div className="text-center py-12"><p className="text-3xl mb-3">❤️</p><p className="font-medium">Sem subscrições activas</p><p className="text-sm text-muted-foreground mt-1 mb-4">Subscreve os teus criadores favoritos</p><Link href="/explorar"><Button size="sm" variant="outline">Explorar canais</Button></Link></div>
          : <div className="space-y-3 mt-3">{active.map((s) => <SubCard key={s.id} sub={s} />)}</div>}
        </TabsContent>
        <TabsContent value="historico">
          {inactive.length === 0 ? <div className="text-center py-12"><p className="text-sm text-muted-foreground">Sem histórico</p></div> : <div className="space-y-3 mt-3">{inactive.map((s) => <SubCard key={s.id} sub={s} />)}</div>}
        </TabsContent>
      </Tabs>
    </div>
  )
}
