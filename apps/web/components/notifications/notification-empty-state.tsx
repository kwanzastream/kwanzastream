"use client"

import { Bell, Radio, Users, Info, CreditCard, Shield, Trophy, Swords } from "lucide-react"

const CATEGORY_EMPTY: Record<string, { emoji: string; title: string; description: string }> = {
  todas: { emoji: "🔔", title: "Sem notificações", description: "Quando algo acontecer, aparece aqui" },
  streams: { emoji: "📺", title: "Sem notificações de streams", description: "Quando um canal que segues for ao vivo, aparece aqui" },
  social: { emoji: "👥", title: "Sem notificações sociais", description: "Novos seguidores e menções aparecem aqui" },
  sistema: { emoji: "ℹ️", title: "Sem notificações do sistema", description: "Actualizações da plataforma aparecem aqui" },
  pagamentos: { emoji: "💰", title: "Sem notificações de pagamentos", description: "Salos, subscrições e payouts aparecem aqui" },
  moderacao: { emoji: "🛡️", title: "Sem notificações de moderação", description: "Reports e acções de moderação aparecem aqui" },
  conquistas: { emoji: "🏆", title: "Sem conquistas", description: "Quando desbloqueares conquistas, aparecem aqui" },
  torneios: { emoji: "⚔️", title: "Sem notificações de torneios", description: "Inscrições e resultados de torneios aparecem aqui" },
}

export function NotificationEmptyState({ category = "todas" }: { category?: string }) {
  const cfg = CATEGORY_EMPTY[category] || CATEGORY_EMPTY.todas
  return (
    <div className="text-center py-16 px-4">
      <p className="text-4xl mb-3">{cfg.emoji}</p>
      <h3 className="font-bold text-lg mb-1">{cfg.title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">{cfg.description}</p>
    </div>
  )
}
