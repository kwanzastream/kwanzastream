"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Shield, AlertTriangle, Ban, CheckCircle2, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AdminModerationPage() {
  // Mock data
  const chatReports = [
    {
      id: "1",
      reportedUser: "Usuário 1",
      reportedBy: "Usuário 2",
      reason: "Spam",
      message: "Mensagem reportada...",
      date: "2h atrás",
      status: "pending"
    },
    {
      id: "2",
      reportedUser: "Usuário 3",
      reportedBy: "Usuário 4",
      reason: "Conteúdo ofensivo",
      message: "Mensagem reportada...",
      date: "5h atrás",
      status: "pending"
    }
  ]

  const contentReports = [
    {
      id: "1",
      type: "live",
      title: "Live Reportada",
      reportedBy: "Usuário 1",
      reason: "Conteúdo inadequado",
      date: "1d atrás",
      status: "pending"
    }
  ]

  const suspensions = [
    {
      id: "1",
      user: "Usuário Suspenso",
      reason: "Violação de termos",
      duration: "7 dias",
      date: "3d atrás",
      status: "active"
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Admin
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
              Moderação
            </h1>
            <p className="text-muted-foreground">
              Gerencia reports, suspensões e conteúdo denunciado
            </p>
          </div>

          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList>
              <TabsTrigger value="chat">
                Reports de Chat ({chatReports.filter(r => r.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="content">
                Conteúdo Denunciado ({contentReports.filter(r => r.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="suspensions">
                Suspensões ({suspensions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports de Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chatReports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageSquare className="w-4 h-4 text-primary" />
                              <span className="font-medium">Report #{report.id}</span>
                              <Badge variant={report.status === "pending" ? "secondary" : "default"}>
                                {report.status === "pending" ? "Pendente" : "Resolvido"}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Reportado:</span> {report.reportedUser}
                              </p>
                              <p>
                                <span className="font-medium">Reportado por:</span> {report.reportedBy}
                              </p>
                              <p>
                                <span className="font-medium">Motivo:</span> {report.reason}
                              </p>
                              <p className="text-muted-foreground italic">"{report.message}"</p>
                              <p className="text-muted-foreground">{report.date}</p>
                            </div>
                          </div>
                        </div>
                        {report.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive">
                              <Ban className="w-4 h-4 mr-2" />
                              Banir Usuário
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Rejeitar Report
                            </Button>
                            <Button size="sm" variant="outline">
                              Avisar Usuário
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo Denunciado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentReports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              <span className="font-medium">{report.title}</span>
                              <Badge variant="outline">{report.type}</Badge>
                              <Badge variant={report.status === "pending" ? "secondary" : "default"}>
                                {report.status === "pending" ? "Pendente" : "Resolvido"}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Reportado por:</span> {report.reportedBy}
                              </p>
                              <p>
                                <span className="font-medium">Motivo:</span> {report.reason}
                              </p>
                              <p className="text-muted-foreground">{report.date}</p>
                            </div>
                          </div>
                        </div>
                        {report.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive">
                              Remover Conteúdo
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Rejeitar Report
                            </Button>
                            <Button size="sm" variant="outline">
                              Ver Conteúdo
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suspensions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Suspensões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suspensions.map((suspension) => (
                      <div key={suspension.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Ban className="w-4 h-4 text-red-600" />
                              <span className="font-medium">{suspension.user}</span>
                              <Badge variant={suspension.status === "active" ? "destructive" : "secondary"}>
                                {suspension.status === "active" ? "Ativo" : "Expirado"}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Motivo:</span> {suspension.reason}
                              </p>
                              <p>
                                <span className="font-medium">Duração:</span> {suspension.duration}
                              </p>
                              <p className="text-muted-foreground">Iniciado em {suspension.date}</p>
                            </div>
                          </div>
                          {suspension.status === "active" && (
                            <Button size="sm" variant="outline">
                              Remover Suspensão
                            </Button>
                          )}
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
