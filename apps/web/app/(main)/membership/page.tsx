"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Crown, Star, Zap } from "lucide-react"

const TIERS = [
  { id: "bronze", name: "Bronze", price: "500 Kz/mês", emoji: "🥉", perks: ["Badge no chat", "Emotes exclusivos (1)", "Sem anúncios"] },
  { id: "prata", name: "Prata", price: "1.500 Kz/mês", emoji: "🥈", perks: ["Tudo do Bronze", "Emotes exclusivos (5)", "Prioridade no chat", "VODs exclusivos"] },
  { id: "ouro", name: "Ouro", price: "3.000 Kz/mês", emoji: "🥇", perks: ["Tudo da Prata", "Emotes exclusivos (10)", "Discord privado", "Shoutout na stream", "Chat 1-on-1 mensal"] },
]

export default function MembershipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2"><Crown className="w-6 h-6 text-yellow-500" />Memberships</h1>
        <p className="text-muted-foreground">Apoia os teus creators favoritos com subscrições mensais.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {TIERS.map((tier) => (
          <div key={tier.id} className={`p-5 rounded-xl border ${tier.id === "ouro" ? "border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-transparent" : "border-white/10 bg-white/5"} space-y-4`}>
            <div className="text-center">
              <span className="text-3xl">{tier.emoji}</span>
              <h3 className="text-lg font-bold mt-2">{tier.name}</h3>
              <p className="text-primary font-semibold mt-1">{tier.price}</p>
            </div>
            <ul className="space-y-2">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-primary shrink-0" />{perk}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              Subscrever
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/membership/minhas" className="text-sm text-primary hover:underline">Ver as minhas memberships →</Link>
      </div>
    </div>
  )
}
