"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, AlertCircle, XCircle, Clock } from "lucide-react"


const services = [
  {
    name: "Streaming",
    status: "operational",
    description: "Serviço de transmissão ao vivo",
    uptime: "99.9%"
  },
  {
    name: "Pagamentos",
    status: "operational",
    description: "Sistema de pagamentos e wallet",
    uptime: "99.8%"
  },
  {
    name: "Login",
    status: "operational",
    description: "Autenticação e OTP",
    uptime: "99.9%"
  },
  {
    name: "API",
    status: "operational",
    description: "API pública e endpoints",
    uptime: "99.7%"
  },
  {
    name: "Chat",
    status: "operational",
    description: "Sistema de chat ao vivo",
    uptime: "99.6%"
  },
  {
    name: "Notificações",
    status: "operational",
    description: "Sistema de notificações push",
    uptime: "99.5%"
  }
]

const incidents = [
  {
    id: "1",
    title: "Manutenção Programada",
    status: "resolved",
    date: "10 Mar, 2025",
    description: "Manutenção de rotina do sistema de streaming"
  }
]

export default function StatusPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "degraded":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "down":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-600">Operacional</Badge>
      case "degraded":
        return <Badge className="bg-yellow-600">Degradado</Badge>
      case "down":
        return <Badge className="bg-red-600">Indisponível</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Status da Plataforma
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitorização em tempo real dos nossos serviços
            </p>
          </div>

          {/* Overall Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Status Geral</CardTitle>
                <Badge className="bg-green-600">Todos os Sistemas Operacionais</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Todos os serviços estão funcionando normalmente. Não há incidentes reportados no momento.
              </p>
            </CardContent>
          </Card>

          {/* Services Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.name}>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <p className="font-bold">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Uptime: {service.uptime}</span>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle>Incidentes Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {incidents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum incidente reportado nos últimos 30 dias
                </p>
              ) : (
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{incident.title}</h3>
                        <Badge variant={incident.status === "resolved" ? "default" : "secondary"}>
                          {incident.status === "resolved" ? "Resolvido" : "Em Andamento"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{incident.date}</p>
                      <p className="text-sm">{incident.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Última atualização: {new Date().toLocaleString("pt-AO")}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Para reportar um problema, contacta{" "}
                <a href="mailto:suporte@kwanza-stream.ao" className="text-primary hover:underline">
                  suporte@kwanza-stream.ao
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
