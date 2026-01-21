'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  Users,
  Heart,
  MessageSquare,
  Zap,
  Calendar,
  Eye,
  Gift,
  Clock,
} from 'lucide-react'

export function CreatorDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Earnings */}
        <Card className="border-white/10 bg-card/50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Ganhos Hoje
                </span>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black text-primary">
                  {(285_000).toLocaleString()}
                </p>
                <p className="text-xs text-green-400 pt-1">
                  +15% vs. ontem
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Viewers */}
        <Card className="border-white/10 bg-card/50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Espectadores
                </span>
                <Users className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-3xl font-black text-secondary">8,542</p>
                <p className="text-xs text-muted-foreground pt-1">
                  Nesta transmissão
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement */}
        <Card className="border-white/10 bg-card/50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Engajamento
                </span>
                <Heart className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-3xl font-black text-accent">
                  {(45_782).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground pt-1">
                  Salos enviados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="border-white/10 bg-card/50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Mensagens
                </span>
                <MessageSquare className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-3xl font-black">2,341</p>
                <p className="text-xs text-muted-foreground pt-1">
                  Hoy en el chat
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Live Button */}
      <Button size="lg" className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-14 text-lg font-bold">
        <Zap className="w-5 h-5" />
        Iniciar Transmissão ao Vivo
      </Button>

      {/* Top Supporters */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-secondary" />
            Top Apoiadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                rank: 1,
                name: 'Elite Supporter',
                avatar: '👑',
                donations: 125000,
                count: 28,
              },
              {
                rank: 2,
                name: 'Gold Member',
                avatar: '⭐',
                donations: 85000,
                count: 18,
              },
              {
                rank: 3,
                name: 'Loyal Fan',
                avatar: '💎',
                donations: 65000,
                count: 14,
              },
              {
                rank: 4,
                name: 'Regular User',
                avatar: '🎯',
                donations: 45000,
                count: 9,
              },
              {
                rank: 5,
                name: 'New Supporter',
                avatar: '🎉',
                donations: 28000,
                count: 5,
              },
            ].map((supporter) => (
              <div
                key={supporter.rank}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 text-lg">{supporter.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{supporter.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {supporter.count} presentes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent text-sm">
                    {(supporter.donations / 1000).toFixed(0)}k Kz
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Hours */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Melhores Horários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { hour: '20:00 - 23:00', viewers: 8542, earnings: 285000 },
              { hour: '18:00 - 20:00', viewers: 6234, earnings: 198500 },
              { hour: '21:00 - 00:00', viewers: 5892, earnings: 176400 },
              { hour: '19:00 - 21:00', viewers: 4156, earnings: 124800 },
              { hour: '17:00 - 19:00', viewers: 3214, earnings: 96400 },
            ].map((slot) => (
              <div
                key={slot.hour}
                className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div>
                  <p className="font-semibold text-sm">{slot.hour}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {slot.viewers.toLocaleString()} espectadores
                    </p>
                    <p className="font-bold text-secondary text-sm">
                      {(slot.earnings / 1000).toFixed(0)}k Kz
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Preview */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Análise Semanal
            </span>
            <Badge variant="secondary">Esta Semana</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple Bar Chart Representation */}
            {[
              { day: 'Seg', height: 60, earnings: 180000 },
              { day: 'Ter', height: 75, earnings: 225000 },
              { day: 'Qua', height: 90, earnings: 270000 },
              { day: 'Qui', height: 85, earnings: 255000 },
              { day: 'Sex', height: 95, earnings: 285000 },
              { day: 'Sab', height: 100, earnings: 300000 },
              { day: 'Dom', height: 70, earnings: 210000 },
            ].map((data) => (
              <div key={data.day} className="space-y-2">
                <div className="flex items-end gap-2 h-16">
                  <div className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t-lg opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${data.height}%` }} />
                  <span className="text-xs font-semibold text-muted-foreground w-8">
                    {data.day}
                  </span>
                </div>
                <p className="text-xs text-accent text-center">
                  {(data.earnings / 1000).toFixed(0)}k
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Management */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" />
            Próximas Transmissões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { time: 'Hoje, 20:00', title: 'Gaming Tournament Final', mode: 'video' },
              { time: 'Amanhã, 19:00', title: 'DJ Set - Kizomba Mix', mode: 'radio' },
              { time: 'Sábado, 22:00', title: 'Debate Cultural', mode: 'video' },
            ].map((schedule, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="font-semibold text-sm">{schedule.title}</p>
                  <p className="text-xs text-muted-foreground">{schedule.time}</p>
                </div>
                <Badge
                  variant="outline"
                  className={schedule.mode === 'video' ? 'bg-pink-500/10 border-pink-500/30' : 'bg-blue-500/10 border-blue-500/30'}
                >
                  {schedule.mode === 'video' ? '📹 Vídeo' : '🎧 Áudio'}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Agendar Nova Transmissão
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
