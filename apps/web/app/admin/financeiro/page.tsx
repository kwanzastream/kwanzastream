"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, DollarSign, TrendingUp, Download, FileText, Calendar, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AdminFinancialPage() {
  const [period, setPeriod] = React.useState("month")

  // Mock data
  const totalTransactions = 1250000
  const totalFees = 62500
  const pendingWithdrawals = 150000
  const completedWithdrawals = 500000

  const transactions = [
    {
      id: "TRX001",
      type: "salo",
      from: "Usuário 1",
      to: "Criador 1",
      amount: 5000,
      fee: 250,
      date: "15 Mar",
      status: "completed"
    },
    {
      id: "TRX002",
      type: "withdrawal",
      from: "Criador 1",
      to: "Multicaixa",
      amount: -50000,
      fee: 1000,
      date: "14 Mar",
      status: "pending"
    }
  ]

  const withdrawals = [
    {
      id: "WD001",
      user: "Criador 1",
      amount: 50000,
      method: "Multicaixa",
      date: "14 Mar",
      status: "pending"
    },
    {
      id: "WD002",
      user: "Criador 2",
      amount: 25000,
      method: "USSD",
      date: "13 Mar",
      status: "completed"
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

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Auditoria Financeira
              </h1>
              <p className="text-muted-foreground">
                Monitoriza todas as transações e saques da plataforma
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Transações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black">{totalTransactions.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">Este período</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxas Coletadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-primary">{totalFees.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">5% por transação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saques Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-yellow-600">{pendingWithdrawals.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">Aguardando aprovação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saques Concluídos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-green-600">{completedWithdrawals.toLocaleString()} Kz</p>
                <p className="text-sm text-muted-foreground mt-2">Este período</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transactions">Ledger Completo</TabsTrigger>
              <TabsTrigger value="withdrawals">Saques</TabsTrigger>
              <TabsTrigger value="export">Exportação</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico Completo de Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-medium">{tx.id}</span>
                            <Badge variant="outline">{tx.type}</Badge>
                            <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                              {tx.status === "completed" ? "Concluído" : "Pendente"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>{tx.from} → {tx.to}</p>
                            <p>{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                            {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()} Kz
                          </p>
                          <p className="text-sm text-muted-foreground">Taxa: {tx.fee} Kz</p>
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
                  <CardTitle>Gestão de Saques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {withdrawals.map((wd) => (
                      <div key={wd.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{wd.id}</span>
                            <Badge variant={wd.status === "completed" ? "default" : "secondary"}>
                              {wd.status === "completed" ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Concluído
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pendente
                                </>
                              )}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>{wd.user} • {wd.method}</p>
                            <p>{wd.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-bold">{wd.amount.toLocaleString()} Kz</p>
                          {wd.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="default">
                                Aprovar
                              </Button>
                              <Button size="sm" variant="outline">
                                Rejeitar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Exportar Dados Financeiros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="w-6 h-6 mb-2" />
                      Exportar CSV
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="w-6 h-6 mb-2" />
                      Exportar PDF
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Download className="w-6 h-6 mb-2" />
                      Relatório Mensal
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="w-6 h-6 mb-2" />
                      Relatório Anual
                    </Button>
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
