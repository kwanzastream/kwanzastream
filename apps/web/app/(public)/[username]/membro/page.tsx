"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Crown, Gem, Check, Heart } from "lucide-react"

const TIERS = [
  {
    id: 1,
    name: "Tier 1",
    slug: "tier-1",
    price: 500,
    icon: Star,
    color: "text-blue-400",
    border: "border-blue-400/30",
    bg: "bg-blue-400/5",
    benefits: ["Badge de subscritor", "5 emotes exclusivos", "Chat sem modo lento", "Cor de nome no chat"],
  },
  {
    id: 2,
    name: "Tier 2",
    slug: "tier-2",
    price: 1500,
    icon: Crown,
    color: "text-purple-400",
    border: "border-purple-400/30",
    bg: "bg-purple-400/5",
    popular: true,
    benefits: ["Tudo do Tier 1", "15 emotes exclusivos", "VODs exclusivos", "Prioridade no chat", "Badge dourado"],
  },
  {
    id: 3,
    name: "Tier 3",
    slug: "tier-3",
    price: 3000,
    icon: Gem,
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    benefits: ["Tudo do Tier 2", "30+ emotes", "Shoutout mensal", "Discord/grupo VIP", "Badge animado", "Nome nos créditos"],
  },
]

export default function ChannelMembroPage() {
  const { username } = useParams()
  const [membershipEnabled, setMembershipEnabled] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then((res) => {
      const u = res.data.user
      if (u?.settings?.membershipEnabled === false) setMembershipEnabled(false)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="py-12 text-center text-muted-foreground">A carregar...</div>

  if (!membershipEnabled) {
    return (
      <div className="text-center py-16">
        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Membership não disponível</p>
        <p className="text-sm text-muted-foreground mt-1">Este canal não tem programa de membership activo</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Torna-te membro de @{username}</h2>
        <p className="text-sm text-muted-foreground mt-1">Apoia o canal e desbloqueia benefícios exclusivos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TIERS.map((tier) => (
          <div key={tier.id} className={`relative rounded-2xl border-2 ${tier.border} ${tier.bg} p-5 transition-all hover:scale-[1.02]`}>
            {tier.popular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px]">
                Mais popular
              </Badge>
            )}
            <div className="text-center mb-4">
              <tier.icon className={`w-10 h-10 mx-auto mb-2 ${tier.color}`} />
              <p className="font-bold text-lg">{tier.name}</p>
              <p className="text-3xl font-bold mt-2">
                {tier.price.toLocaleString("pt-AO")} <span className="text-sm font-normal text-muted-foreground">Kz/mês</span>
              </p>
            </div>
            <ul className="space-y-2 mb-5">
              {tier.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.color}`} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
              <Link href={`/${username}/membro/${tier.slug}`}>Tornar-me membro</Link>
            </Button>
          </div>
        ))}
      </div>

      {/* Testimonials placeholder */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">Pagamento via Multicaixa Express · e-Kwanza · Unitel Money</p>
      </div>
    </div>
  )
}
