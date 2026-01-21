"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Gift, Video, Calendar, Bell, Check } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function NotificationsPage() {
  // Mock data
  const allNotifications = [
    { id: "1", type: "salo", message: "Recebeste 500 Kz de Salo de Usuário 1", time: "2h", unread: true },
    { id: "2", type: "live", message: "Gaming Angola está ao vivo", time: "5h", unread: true },
    { id: "3", type: "event", message: "Novo evento: Festival de Música", time: "1d", unread: false },
    { id: "4", type: "salo", message: "Recebeste 1000 Kz de Salo de Usuário 2", time: "2d", unread: false },
    { id: "5", type: "system", message: "Atualização da plataforma disponível", time: "3d", unread: false }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "salo":
        return <Gift className="w-5 h-5 text-primary" />
      case "live":
        return <Video className="w-5 h-5 text-red-600" />
      case "event":
        return <Calendar className="w-5 h-5 text-secondary" />
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "salo":
        return "bg-primary/20"
      case "live":
        return "bg-red-600/20"
      case "event":
        return "bg-secondary/20"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} userNotifications={allNotifications.filter(n => n.unread).length} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/app">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-tighter">Notificações</h1>
                <p className="text-muted-foreground">Mantém-te atualizado sobre tudo</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Marcar Todas como Lidas
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">
                Todas ({allNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Não Lidas ({allNotifications.filter(n => n.unread).length})
              </TabsTrigger>
              <TabsTrigger value="salos">Salos</TabsTrigger>
              <TabsTrigger value="lives">Lives</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {allNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-muted/50 transition-colors ${notif.unread ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getBadgeColor(notif.type)}`}>
                            {getIcon(notif.type)}
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
            </TabsContent>

            <TabsContent value="unread" className="space-y-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {allNotifications.filter(n => n.unread).map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 hover:bg-muted/50 transition-colors bg-primary/5"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getBadgeColor(notif.type)}`}>
                            {getIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{notif.message}</p>
                            <p className="text-sm text-muted-foreground">{notif.time} atrás</p>
                          </div>
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salos" className="space-y-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {allNotifications.filter(n => n.type === "salo").map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-muted/50 transition-colors ${notif.unread ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <Gift className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{notif.message}</p>
                            <p className="text-sm text-muted-foreground">{notif.time} atrás</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lives" className="space-y-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {allNotifications.filter(n => n.type === "live").map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-muted/50 transition-colors ${notif.unread ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-red-600/20">
                            <Video className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{notif.message}</p>
                            <p className="text-sm text-muted-foreground">{notif.time} atrás</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {allNotifications.filter(n => n.type === "event").map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-muted/50 transition-colors ${notif.unread ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-secondary/20">
                            <Calendar className="w-5 h-5 text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{notif.message}</p>
                            <p className="text-sm text-muted-foreground">{notif.time} atrás</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
