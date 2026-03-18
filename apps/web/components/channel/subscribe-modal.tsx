"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Star, Gem } from "lucide-react"

interface SubscribeModalProps {
  open: boolean
  onClose: () => void
  username: string
  channelId: string
}

const TIERS = [
  {
    id: 1,
    name: "Tier 1",
    price: 500,
    icon: Star,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/30",
    benefits: [
      "Badge de subscritor",
      "Emotes exclusivos (5)",
      "Chat sem modo lento",
      "Cor de nome no chat",
    ],
  },
  {
    id: 2,
    name: "Tier 2",
    price: 1500,
    icon: Crown,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10 border-purple-400/30",
    popular: true,
    benefits: [
      "Tudo do Tier 1",
      "Emotes exclusivos (15)",
      "VODs exclusivos",
      "Prioridade no chat",
      "Badge dourado",
    ],
  },
  {
    id: 3,
    name: "Tier 3",
    price: 3000,
    icon: Gem,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10 border-amber-400/30",
    benefits: [
      "Tudo do Tier 2",
      "Todos os emotes (30+)",
      "Shoutout mensal no stream",
      "Acesso a Discord/grupo VIP",
      "Badge animado",
      "Nome nos créditos",
    ],
  },
]

export function SubscribeModal({ open, onClose, username, channelId }: SubscribeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subscrever a @{username}</DialogTitle>
          <DialogDescription>Escolhe o teu tier de subscrição. Pagamento mensal em Kwanzas.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-xl border-2 p-4 transition-all hover:scale-[1.02] ${tier.bgColor}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px]">
                  Mais popular
                </Badge>
              )}

              <div className="text-center mb-3">
                <tier.icon className={`w-8 h-8 mx-auto mb-2 ${tier.color}`} />
                <p className="font-bold">{tier.name}</p>
                <p className="text-2xl font-bold mt-1">
                  {tier.price.toLocaleString("pt-AO")} <span className="text-sm font-normal text-muted-foreground">Kz/mês</span>
                </p>
              </div>

              <ul className="space-y-1.5 mb-4">
                {tier.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs">
                    <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.color}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={tier.popular ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  // Future: open payment flow
                  onClose()
                }}
              >
                Subscrever
              </Button>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-muted-foreground mt-2">
          Pagamento via Multicaixa Express · e-Kwanza · Unitel Money
        </p>
      </DialogContent>
    </Dialog>
  )
}
