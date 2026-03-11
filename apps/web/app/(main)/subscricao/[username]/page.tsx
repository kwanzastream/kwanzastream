"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Check, Crown, Heart, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const TIERS = [
  { id: "SUPPORTER", label: "Supporter", price: 500, icon: Heart, color: "text-pink-400", perks: ["Badge exclusivo no chat", "Acesso a emotes do canal", "Sem anúncios durante streams"] },
  { id: "VIP", label: "VIP", price: 1500, icon: Crown, color: "text-[#F9D616]", popular: true, perks: ["Tudo do Supporter", "Badge VIP dourado", "Acesso a VODs exclusivos", "Chat prioritário", "Mensagem directa ao criador"] },
]

export default function SubscricaoPage() {
  const params = useParams()
  const username = params.username as string
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [creator, setCreator] = useState<any>(null)
  const [currentSub, setCurrentSub] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState<string | null>(null)

  useEffect(() => {
    api.get(`/api/users/${username}`)
      .then(async (res) => {
        const c = res.data?.user || res.data
        setCreator(c)
        if (c?.id) { try { const r = await api.get(`/api/subscriptions/check/${c.id}`); setCurrentSub(r.data?.subscription || r.data) } catch {} }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [username])

  const handleSubscribe = async (tier: string) => {
    if (!creator) return
    if (!user) { router.push(`/entrar?redirect=/subscricao/${username}`); return }
    setSubscribing(tier)
    try {
      await api.post("/api/subscriptions/", { creatorId: creator.id, tier })
      await refreshUser()
      toast.success(`Subscreveste @${username} como ${tier}! 🎉`)
      router.push(`/${username}`)
    } catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao subscrever") }
    finally { setSubscribing(null) }
  }

  const handleCancel = async () => {
    if (!currentSub || !confirm("Cancelar subscrição?")) return
    try { await api.delete(`/api/subscriptions/${currentSub.id}`); setCurrentSub(null); toast.success("Subscrição cancelada") }
    catch { toast.error("Erro ao cancelar") }
  }

  if (loading) return <div className="max-w-lg mx-auto pt-8 space-y-4"><Skeleton className="h-24 rounded-xl" /><div className="grid grid-cols-2 gap-4"><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></div></div>

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => router.push(`/${username}`)}><ArrowLeft className="w-4 h-4" /></Button><h1 className="text-xl font-bold">Subscrever canal</h1></div>
      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50">
        <Avatar className="w-14 h-14"><AvatarImage src={creator?.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{creator?.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
        <div><p className="font-bold">{creator?.displayName}</p><p className="text-sm text-muted-foreground">@{creator?.username}</p></div>
      </div>
      {currentSub && (
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5"><p className="text-sm font-medium">Já és {currentSub.tier} deste canal</p><p className="text-xs text-muted-foreground mt-0.5">Renova em {new Date(currentSub.expiresAt).toLocaleDateString("pt-AO")}</p>
          <Button variant="ghost" size="sm" className="mt-2 text-xs text-destructive hover:text-destructive h-7" onClick={handleCancel}>Cancelar subscrição</Button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TIERS.map((tier) => {
          const Icon = tier.icon; const isActive = currentSub?.tier === tier.id
          return (
            <Card key={tier.id} className={`border relative ${(tier as any).popular ? "border-[#F9D616]/50" : "border-border/50"} ${isActive ? "ring-2 ring-primary" : ""}`}>
              {(tier as any).popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-[#F9D616] text-black text-xs">Mais popular</Badge></div>}
              <CardHeader className="pb-3 pt-5"><div className="flex items-center gap-2 mb-1"><Icon className={`w-5 h-5 ${tier.color}`} /><CardTitle className="text-base">{tier.label}</CardTitle></div><p className="text-2xl font-bold">{tier.price.toLocaleString("pt-AO")} <span className="text-sm font-normal text-muted-foreground">Kz/mês</span></p></CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-1.5">{tier.perks.map((p) => <li key={p} className="flex items-start gap-2 text-xs"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />{p}</li>)}</ul>
                {isActive ? <Button variant="outline" className="w-full text-xs" disabled>Subscrição activa ✓</Button>
                : <Button className={`w-full text-xs ${(tier as any).popular ? "bg-[#F9D616] text-black hover:bg-[#F9D616]/90" : ""}`} variant={(tier as any).popular ? "default" : "outline"} onClick={() => handleSubscribe(tier.id)} disabled={!!subscribing}>{subscribing === tier.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : `Subscrever — ${tier.price.toLocaleString("pt-AO")} Kz/mês`}</Button>}
              </CardContent>
            </Card>
          )
        })}
      </div>
      <p className="text-xs text-center text-muted-foreground">A subscrição é renovada mensalmente. Podes cancelar a qualquer momento.</p>
    </div>
  )
}
