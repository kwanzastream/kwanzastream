"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Server, Activity, AlertCircle, CheckCircle2, Clock, Database, Cpu } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AdminSystemPage() {
  // Mock data
  const services = [
    { name: "API Gateway", status: "operational", uptime: "99.9%", responseTime: "45ms" },
    { name: "Database", status: "operational", uptime: "99.8%", responseTime: "12ms" },
    { name: "Redis Cache", status: "operational", uptime: "99.9%", responseTime: "2ms" },
    { name: "Streaming Server", status: "operational", uptime: "99.7%", responseTime: "120ms" },
    { name: "Payment Gateway", status: "operational", uptime: "99.9%", responseTime: "80ms" }
  ]

  const recentErrors = [
    { id: "1", service: "API Gateway", error: "Timeout exception", time: "2h atrás", severity: "medium" },
    { id: "2", service: "Database", error: "Connection pool exhausted", time: "5h atrás", severity: "high" }
  ]

  const metrics = {
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 1250
  }

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
              Infraestrutura
            </h1>
            <p className="text-muted-foreground">
              Monitoriza o status dos serviços e recursos do sistema
            </p>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Cpu className="w-8 h-8 text-primary opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">CPU</p>
                <p className="text-2xl font-black">{metrics.cpu}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Database className="w-8 h-8 text-secondary opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Memória</p>
                <p className="text-2xl font-black">{metrics.memory}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Server className="w-8 h-8 text-accent opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Disco</p>
                <p className="text-2xl font-black">{metrics.disk}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-primary opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Rede</p>
                <p className="text-2xl font-black">{metrics.network} MB/s</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="services" className="space-y-6">
            <TabsList>
              <TabsTrigger value="services">Status dos Serviços</TabsTrigger>
              <TabsTrigger value="errors">Erros Recentes</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-4">
                          {service.status === "operational" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Uptime: {service.uptime}</span>
                              <span>Response: {service.responseTime}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={service.status === "operational" ? "default" : "destructive"}>
                          {service.status === "operational" ? "Operacional" : "Indisponível"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Erros Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentErrors.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum erro reportado nas últimas 24 horas
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {recentErrors.map((error) => (
                        <div key={error.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <AlertCircle className={`w-4 h-4 ${
                                error.severity === "high" ? "text-red-600" : "text-yellow-600"
                              }`} />
                              <span className="font-medium">{error.service}</span>
                              <Badge variant={error.severity === "high" ? "destructive" : "secondary"}>
                                {error.severity === "high" ? "Alta" : "Média"}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{error.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{error.error}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Logs do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-96 overflow-y-auto">
                    <div className="space-y-1">
                      <div>[2025-03-15 10:30:15] INFO: API request processed successfully</div>
                      <div>[2025-03-15 10:30:14] INFO: Database query executed in 12ms</div>
                      <div>[2025-03-15 10:30:13] INFO: User authentication successful</div>
                      <div>[2025-03-15 10:30:12] INFO: Cache hit for key: user:123</div>
                      <div>[2025-03-15 10:30:11] INFO: Streaming connection established</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline">Exportar Logs</Button>
                    <Button variant="outline">Limpar Logs</Button>
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
