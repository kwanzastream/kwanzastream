"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Wallet, 
  Video, 
  Calendar, 
  Bell,
  TrendingUp,
  Users,
  Gift,
  ArrowRight,
  Flame
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { LiveFeed } from "@/components/live-feed"

export default function AppDashboardPage() {
  // Mock data
  const walletBalance = 12500
  const upcomingEvents = [
    {
      id: "1",
      title: "Festival de Música Angolana",
      date: "15 Mar",
      time: "20:00",
      thumbnail: "/api/placeholder/200/120"
    },
    {
      id: "2",
      title: "Torneio de FIFA 25",
      date: "20 Mar",
      time: "18:00",
      thumbnail: "/api/placeholder/200/120"
    }
  ]

  const notifications = [
    { id: "1", type: "salo", message: "Recebeste 500 Kz de Salo", time: "2h", unread: true },
    { id: "2", type: "live", message: "Gaming Angola está ao vivo", time: "5h", unread: true },
    { id: "3", type: "event", message: "Novo evento: Festival de Música", time: "1d", unread: false }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} userBalance={walletBalance} userNotifications={notifications.filter(n => n.unread).length} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Olá! 👋
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo de volta à Kwanza Stream
              </p>
            </div>
            <Link href="/app/wallet">
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Saldo da Wallet</p>
                      <p className="text-2xl font-black">{walletBalance.toLocaleString()} Kz</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Salos Enviados</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Gift className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Eventos Inscritos</p>
                    <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-secondary opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Seguindo</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Users className="w-8 h-8 text-accent opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lives Assistidas</p>
                    <p className="text-2xl font-bold">48</p>
                  </div>
                  <Video className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Streams */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" />
                Lives Recomendadas
              </h2>
              <Link href="/explorar">
                <Button variant="outline" size="sm">
                  Ver Todas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <LiveFeed />
          </section>

          {/* Upcoming Events */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Eventos Inscritos</h2>
              <Link href="/eventos">
                <Button variant="outline" size="sm">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/eventos/${event.id}`}>
                  <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-32 h-24 bg-muted flex-shrink-0" />
                      <CardContent className="p-4 flex-1">
                        <Badge className="mb-2">Próximo</Badge>
                        <h3 className="font-bold mb-1 line-clamp-1">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date} às {event.time}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Notifications */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Notificações Recentes</h2>
              <Link href="/app/notificacoes">
                <Button variant="outline" size="sm">
                  Ver Todas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${notif.unread ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          notif.type === "salo" ? "bg-primary/20" :
                          notif.type === "live" ? "bg-red-600/20" :
                          "bg-secondary/20"
                        }`}>
                          {notif.type === "salo" ? (
                            <Gift className="w-4 h-4 text-primary" />
                          ) : notif.type === "live" ? (
                            <Video className="w-4 h-4 text-red-600" />
                          ) : (
                            <Calendar className="w-4 h-4 text-secondary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{notif.message}</p>
                          <p className="text-sm text-muted-foreground">{notif.time} atrás</p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
