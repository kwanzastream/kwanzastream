"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Users, Gift, Shield, Ban, Search, Crown } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function CommunityPage() {
  // Mock data
  const followers = [
    { id: "1", name: "Usuário 1", avatar: "/abstract-profile.png", totalSalos: 5000, isModerator: false },
    { id: "2", name: "Usuário 2", avatar: "/abstract-profile.png", totalSalos: 3000, isModerator: true },
    { id: "3", name: "Usuário 3", avatar: "/abstract-profile.png", totalSalos: 2000, isModerator: false }
  ]

  const topDonors = [
    { id: "1", name: "Usuário 1", avatar: "/abstract-profile.png", amount: 5000, rank: 1 },
    { id: "2", name: "Usuário 2", avatar: "/abstract-profile.png", amount: 3000, rank: 2 },
    { id: "3", name: "Usuário 3", avatar: "/abstract-profile.png", amount: 2000, rank: 3 }
  ]

  const bannedUsers = [
    { id: "1", name: "Usuário Banido", reason: "Spam no chat", date: "10 Mar" }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/studio">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Studio
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
              Comunidade
            </h1>
            <p className="text-muted-foreground">
              Gerencia os teus seguidores, moderadores e doadores
            </p>
          </div>

          <Tabs defaultValue="followers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="followers">
                Seguidores ({followers.length})
              </TabsTrigger>
              <TabsTrigger value="donors">Top Doadores</TabsTrigger>
              <TabsTrigger value="moderators">Moderadores</TabsTrigger>
              <TabsTrigger value="banned">Banidos</TabsTrigger>
            </TabsList>

            <TabsContent value="followers" className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Pesquisar seguidores..." className="pl-9" />
                </div>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {followers.map((follower) => (
                      <div key={follower.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={follower.avatar} />
                            <AvatarFallback>{follower.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{follower.name}</p>
                              {follower.isModerator && (
                                <Badge variant="outline" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Moderador
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {follower.totalSalos.toLocaleString()} Kz em Salos
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!follower.isModerator && (
                            <Button variant="outline" size="sm">
                              <Shield className="w-4 h-4 mr-2" />
                              Tornar Moderador
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Ban className="w-4 h-4 mr-2" />
                            Banir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ranking de Doadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topDonors.map((donor) => (
                      <div key={donor.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="w-10 h-10 rounded-full flex items-center justify-center text-lg">
                            {donor.rank === 1 && <Crown className="w-5 h-5 text-yellow-600" />}
                            {donor.rank !== 1 && donor.rank}
                          </Badge>
                          <Avatar>
                            <AvatarImage src={donor.avatar} />
                            <AvatarFallback>{donor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{donor.name}</p>
                            <p className="text-sm text-muted-foreground">Total em Salos</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{donor.amount.toLocaleString()} Kz</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderators" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Moderadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {followers.filter(f => f.isModerator).map((mod) => (
                      <div key={mod.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={mod.avatar} />
                            <AvatarFallback>{mod.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{mod.name}</p>
                              <Badge variant="outline">
                                <Shield className="w-3 h-3 mr-1" />
                                Moderador
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {mod.totalSalos.toLocaleString()} Kz em Salos
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Remover Moderação
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="banned" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Usuários Banidos</CardTitle>
                </CardHeader>
                <CardContent>
                  {bannedUsers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum usuário banido
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {bannedUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">Motivo: {user.reason}</p>
                            <p className="text-sm text-muted-foreground">Data: {user.date}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Desbanir
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
