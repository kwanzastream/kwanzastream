"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, TrendingUp, Gift, Download, Calendar, Wallet } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EarningsPage() {
  const [period, setPeriod] = React.useState("month")

  // Mock data
  const totalEarnings = 125000
  const availableBalance = 95000
  const pendingWithdrawals = 5000
  const platformFee = 25000

  const earningsByPeriod = [
    { period: "Este Mês", amount: 45000 },
    { period: "Mês Passado", amount: 35000 },
    { period: "Últimos 3 Meses", amount: 125000 }
  ]

  const recentSalos = [
    { id: "1", from: "Usuário 1", amount: 5000, date: "15 Mar", fee: 250, net: 4750 },
    { id: "2", from: "Usuário 2", amount: 3000, date: "14 Mar", fee: 150, net: 2850 },
    { id: "3", from: "Usuário 3", amount: 2000, date: "13 Mar", fee: 100, net: 1900 }
  ]

  const withdrawals = [
    { id: "1", amount: 50000, date: "10 Mar", status: "completed", method: "Multicaixa" },
    { id: "2", amount: 25000, date: "5 Mar", status: "pending", method: "USSD" }
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

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Monetização
              </h1>
              <p className="text-muted-foreground">
                Acompanha os teus ganhos e solicita saques
              </p>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Últimos 3 Meses</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Ganhos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black">{totalEarnings.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">Todos os tempos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saldo Disponível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-primary">{availableBalance.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">Pronto para saque</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa da Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-muted-foreground">{platformFee.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">5% por transação</p>
              </CardContent>
            </Card>
          </div>

          {/* Withdraw Button */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg mb-1">Solicitar Saque</p>
                  <p className="text-sm text-muted-foreground">
                    Saldo disponível: {availableBalance.toLocaleString()} Kz
                  </p>
                  {pendingWithdrawals > 0 && (
                    <p className="text-sm text-yellow-600 mt-1">
                      Saque pendente: {pendingWithdrawals.toLocaleString()} Kz
                    </p>
                  )}
                </div>
                <Button size="lg" disabled={availableBalance < 500}>
                  <Wallet className="w-5 h-5 mr-2" />
                  Solicitar Saque
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="salos" className="space-y-6">
            <TabsList>
              <TabsTrigger value="salos">Salos Recebidos</TabsTrigger>
              <TabsTrigger value="withdrawals">Saques</TabsTrigger>
              <TabsTrigger value="analytics">Análise</TabsTrigger>
            </TabsList>

            <TabsContent value="salos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Salos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSalos.map((salo) => (
                      <div key={salo.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 text-primary" />
                            <p className="font-medium">{salo.from}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{salo.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{salo.amount.toLocaleString()} Kz</p>
                          <div className="text-xs text-muted-foreground">
                            <span>Taxa: -{salo.fee} Kz</span>
                            <span className="ml-2">Líquido: {salo.net.toLocaleString()} Kz</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Saques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {withdrawals.map((withdrawal) => (
                      <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Download className="w-4 h-4 text-secondary" />
                            <p className="font-medium">{withdrawal.method}</p>
                            <Badge variant={withdrawal.status === "completed" ? "default" : "secondary"}>
                              {withdrawal.status === "completed" ? "Concluído" : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{withdrawal.date}</p>
                        </div>
                        <p className="font-bold">{withdrawal.amount.toLocaleString()} Kz</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {earningsByPeriod.map((item, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {item.period}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-black">{item.amount.toLocaleString()} Kz</p>
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
