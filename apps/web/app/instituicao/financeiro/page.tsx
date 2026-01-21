"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, DollarSign, TrendingUp, Download, Wallet, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function InstitutionFinancialPage() {
  const [period, setPeriod] = React.useState("month")

  // Mock data
  const totalRevenue = 500000
  const availableBalance = 475000
  const pendingWithdrawals = 25000
  const platformFees = 25000

  const transactions = [
    { id: "1", type: "event", description: "Culto de Domingo", amount: 25000, date: "15 Mar", status: "completed" },
    { id: "2", type: "event", description: "Workshop", amount: 15000, date: "10 Mar", status: "completed" },
    { id: "3", type: "withdrawal", description: "Saque para conta bancária", amount: -50000, date: "8 Mar", status: "completed" },
    { id: "4", type: "event", description: "Conferência", amount: 30000, date: "5 Mar", status: "completed" }
  ]

  const invoices = [
    { id: "INV001", period: "Março 2025", amount: 500000, status: "paid", date: "1 Mar" },
    { id: "INV002", period: "Fevereiro 2025", amount: 450000, status: "paid", date: "1 Fev" }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/instituicao">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Financeiro Institucional
              </h1>
              <p className="text-muted-foreground">
                Gerencia receitas, saques e relatórios financeiros
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
                  Receitas Totais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black">{totalRevenue.toLocaleString()} Kz</p>
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
                  Taxas da Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-muted-foreground">{platformFees.toLocaleString()} Kz</p>
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
                <p className="text-sm text-muted-foreground mt-2">Em processamento</p>
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
                </div>
                <Button size="lg" disabled={availableBalance < 500}>
                  <Wallet className="w-5 h-5 mr-2" />
                  Solicitar Saque
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="invoices">Faturas</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {tx.type === "event" ? (
                              <Calendar className="w-4 h-4 text-primary" />
                            ) : (
                              <Wallet className="w-4 h-4 text-secondary" />
                            )}
                            <p className="font-medium">{tx.description}</p>
                            <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                              {tx.status === "completed" ? "Concluído" : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                        <p className={`font-bold ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                          {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()} Kz
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Faturas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-primary" />
                            <p className="font-medium">{invoice.id}</p>
                            <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                              {invoice.status === "paid" ? "Pago" : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{invoice.period} • {invoice.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-bold">{invoice.amount.toLocaleString()} Kz</p>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Financeiros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="w-6 h-6 mb-2" />
                      Relatório Mensal
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="w-6 h-6 mb-2" />
                      Relatório Anual
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Download className="w-6 h-6 mb-2" />
                      Exportar CSV
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Download className="w-6 h-6 mb-2" />
                      Exportar PDF
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
