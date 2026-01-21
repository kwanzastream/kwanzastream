"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle2,
  Users,
  UserPlus,
  Gift,
  Video,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Share2,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"

export default function UserProfilePage() {
  const params = useParams()
  const username = params?.username as string

  // Mock data
  const user = {
    username: username || "usuario",
    name: "Nome do Usuário",
    avatar: "/abstract-profile.png",
    bio: "Criador de conteúdo angolano apaixonado por tecnologia e cultura. Bem-vindos à minha comunidade!",
    location: "Luanda, Angola",
    website: "https://exemplo.com",
    verified: true,
    followers: 1250,
    following: 340,
    salosReceived: 12500,
    status: "online" as "online" | "offline" | "live",
    isFollowing: false
  }

  const recentSalos = [
    { id: "1", from: "Usuário 1", amount: 500, time: "2h" },
    { id: "2", from: "Usuário 2", amount: 1000, time: "5h" },
    { id: "3", from: "Usuário 3", amount: 250, time: "1d" }
  ]

  const badges = [
    { name: "Primeiro Salo", icon: "🎁" },
    { name: "100 Seguidores", icon: "👥" },
    { name: "Criador Ativo", icon: "⭐" }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-48 md:h-64 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 pb-8">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl md:text-4xl font-black">{user.name}</h1>
                      {user.verified && (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground">@{user.username}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button variant={user.isFollowing ? "outline" : "default"} size="sm">
                      {user.isFollowing ? (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Seguindo
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Seguir
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {user.bio && (
                  <p className="text-muted-foreground max-w-2xl">{user.bio}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {user.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Website</span>
                    </a>
                  )}
                  <Badge variant={user.status === "live" ? "destructive" : user.status === "online" ? "default" : "secondary"}>
                    {user.status === "live" ? "AO VIVO" : user.status === "online" ? "Online" : "Offline"}
                  </Badge>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-bold">{user.followers.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">seguidores</span>
                  </div>
                  <div>
                    <span className="font-bold">{user.following.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">seguindo</span>
                  </div>
                  <div>
                    <span className="font-bold">{user.salosReceived.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">Kz em Salos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <Tabs defaultValue="salos" className="space-y-6">
            <TabsList>
              <TabsTrigger value="salos">Salos Recebidos</TabsTrigger>
              <TabsTrigger value="lives">Lives</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="salos" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    Histórico de Salos
                  </h3>
                  <div className="space-y-3">
                    {recentSalos.map((salo) => (
                      <div key={salo.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{salo.from}</p>
                          <p className="text-sm text-muted-foreground">{salo.time} atrás</p>
                        </div>
                        <p className="font-bold text-primary">{salo.amount.toLocaleString()} Kz</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lives" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
                    <div className="aspect-video bg-muted" />
                    <CardContent className="p-4">
                      <p className="font-medium mb-1">Live #{i}</p>
                      <p className="text-sm text-muted-foreground">2 dias atrás • 1.2K visualizações</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="badges" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <Card key={i} className="hover:border-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <p className="font-bold">{badge.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
