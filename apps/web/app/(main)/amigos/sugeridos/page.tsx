"use client"

import { useState } from "react"
import { UserSuggestionCard } from "@/components/social/user-suggestion-card"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK = [
  { username: "dj_maputo", displayName: "DJ Maputo", reason: "Seguido por @angolangamer e mais 3", followers: 2400 },
  { username: "fifa_angola", displayName: "FIFA Angola", reason: "Interesses similares: Gaming", followers: 8900 },
  { username: "maria_cozinha", displayName: "Maria Cozinha", reason: "Criadora da tua província — Luanda", followers: 1200 },
  { username: "basketball_ao", displayName: "Basketball AO", reason: "Trending em Angola esta semana", followers: 5600 },
  { username: "coding_luanda", displayName: "Coding Luanda", reason: "Seguido por @tech_ao", followers: 890 },
]

export default function AmigosSugeridosPage() {
  const [suggestions, setSuggestions] = useState(MOCK)

  const handleFollow = (username: string) => {
    setSuggestions(prev => prev.filter(s => s.username !== username))
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/amigos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Sugestões</h1></div>
      <p className="text-xs text-muted-foreground">Baseado nos teus interesses, follows e localização</p>

      <div className="space-y-2">
        {suggestions.map(s => (
          <UserSuggestionCard key={s.username} {...s} onFollow={() => handleFollow(s.username)} />
        ))}
      </div>

      {suggestions.length === 0 && (
        <div className="text-center py-16"><Sparkles className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem mais sugestões por agora — volta mais tarde!</p></div>
      )}
    </div>
  )
}
