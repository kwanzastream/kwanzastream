'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gift, Sparkles, Crown } from 'lucide-react'
import { useState } from 'react'

interface Salo {
  id: string
  name: string
  value: number
  icon: string
  emoji: string
  color: string
  sound: string
  status: 'Bronze' | 'Bronze-Alto' | 'Prata' | 'Ouro' | 'Diamante'
  animation: string
}

const salos: Salo[] = [
  {
    id: 'paozinho',
    name: 'Pãozinho',
    value: 50,
    icon: '🥖',
    emoji: '🥖',
    color: 'from-amber-500 to-orange-500',
    sound: 'crunch',
    status: 'Bronze',
    animation: 'bounce',
  },
  {
    id: 'gasosa',
    name: 'Gasosa',
    value: 100,
    icon: '🥤',
    emoji: '🥤',
    color: 'from-red-500 to-pink-500',
    sound: 'clink',
    status: 'Bronze-Alto',
    animation: 'bounce-slow',
  },
  {
    id: 'copo',
    name: 'Copo de bebida',
    value: 500,
    icon: '🍻',
    emoji: '🍻',
    color: 'from-blue-500 to-purple-500',
    sound: 'toast',
    status: 'Prata',
    animation: 'swing',
  },
  {
    id: 'feixe',
    name: 'Feixe de notas',
    value: 5000,
    icon: '💵',
    emoji: '💵',
    color: 'from-yellow-500 to-yellow-400',
    sound: 'money',
    status: 'Ouro',
    animation: 'spin',
  },
  {
    id: 'rei',
    name: 'Rei/Soba',
    value: 20000,
    icon: '👑',
    emoji: '👑',
    color: 'from-purple-600 to-pink-600',
    sound: 'trumpet',
    status: 'Diamante',
    animation: 'pulse-large',
  },
]

const statusBadges = {
  Bronze: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  'Bronze-Alto': 'bg-orange-500/20 text-orange-300 border-orange-500/50',
  Prata: 'bg-slate-400/20 text-slate-300 border-slate-400/50',
  Ouro: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  Diamante: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
}

export function SaloSystem() {
  const [selectedSalo, setSelectedSalo] = useState<Salo | null>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSendSalo = async (salo: Salo) => {
    setSelectedSalo(salo)
    setIsSending(true)
    // Simulate sending
    setTimeout(() => {
      setIsSending(false)
      setSelectedSalo(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Salo System Header */}
      <Card className="border-white/10 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Gift className="w-6 h-6 text-primary" />
                Sistema Salo
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Envie presentes virtuais inspirados na cultura angolana e apoie
                os teus criadores favoritos
              </p>
            </div>
            <Sparkles className="w-8 h-8 text-secondary opacity-50" />
          </div>
        </CardHeader>
      </Card>

      {/* Salo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {salos.map((salo) => (
          <Card
            key={salo.id}
            className="border-white/10 hover:border-primary/50 transition-all cursor-pointer group overflow-hidden bg-card/50"
            onClick={() => handleSendSalo(salo)}
          >
            <CardContent className="pt-6 pb-6 space-y-3 text-center">
              {/* Salo Icon */}
              <div className="text-5xl group-hover:scale-110 transition-transform inline-block">
                {salo.emoji}
              </div>

              {/* Salo Name */}
              <div>
                <p className="font-bold text-sm group-hover:text-primary transition-colors">
                  {salo.name}
                </p>
              </div>

              {/* Status Badge */}
              <Badge
                variant="outline"
                className={`${statusBadges[salo.status]} border justify-center w-full`}
              >
                {salo.status}
              </Badge>

              {/* Value */}
              <div className="pt-2 border-t border-white/10">
                <p className="text-2xl font-black text-accent">
                  {salo.value.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Kwanzas</p>
              </div>

              {/* Send Button */}
              <Button
                size="sm"
                className={`w-full gap-2 bg-gradient-to-r ${salo.color} text-white hover:shadow-lg transition-all ${
                  isSending && selectedSalo?.id === salo.id
                    ? 'opacity-50'
                    : 'opacity-100'
                }`}
                disabled={isSending && selectedSalo?.id === salo.id}
              >
                <Gift className="w-3 h-3" />
                {isSending && selectedSalo?.id === salo.id
                  ? 'Enviando...'
                  : 'Enviar'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Salo Status Levels */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Crown className="w-5 h-5 text-secondary" />
            Níveis de Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                level: 'Bronze',
                total: '50 - 100 Kz',
                benefit: 'Nome colorido no chat',
              },
              {
                level: 'Prata',
                total: '500+ Kz',
                benefit: 'Mensagem em destaque',
              },
              {
                level: 'Ouro',
                total: '5.000+ Kz',
                benefit: 'Ícone dourado',
              },
              {
                level: 'Diamante',
                total: '20.000+ Kz',
                benefit: 'Rank no leaderboard',
              },
              {
                level: 'VIP',
                total: 'Premium Member',
                benefit: 'Sem anúncios + Bonusos',
              },
            ].map((level) => (
              <div key={level.level} className="text-center space-y-2 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <Badge
                  className={`justify-center w-full ${
                    statusBadges[level.level as keyof typeof statusBadges] ||
                    'bg-blue-500/20 text-blue-300 border-blue-500/50'
                  }`}
                >
                  {level.level}
                </Badge>
                <p className="text-xs font-semibold text-accent">{level.total}</p>
                <p className="text-xs text-muted-foreground">{level.benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Doadores */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            Top Doadores Esta Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'DJ Elite', total: 450000, salos: 25 },
              { rank: 2, name: 'Gaming Pro', total: 325000, salos: 18 },
              { rank: 3, name: 'Music Lover', total: 285000, salos: 16 },
              { rank: 4, name: 'Comedy Fan', total: 195000, salos: 12 },
              { rank: 5, name: 'Night Owl', total: 145000, salos: 8 },
            ].map((doador) => (
              <div
                key={doador.rank}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm">
                    {doador.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{doador.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doador.salos} presentes enviados
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent text-sm">
                    {(doador.total / 1000).toFixed(0)}k Kz
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
