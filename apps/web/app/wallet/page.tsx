"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Gift,
  Users,
  Download,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

const transactionHistory = [
  { id: "TRX001", type: "gift", from: "Sandra Gomes", amount: 5000, date: "2024-03-15", status: "completed" },
  { id: "TRX002", type: "subscription", from: "Sistema", amount: 12000, date: "2024-03-14", status: "completed" },
  {
    id: "TRX003",
    type: "withdrawal",
    from: "Multicaixa Express",
    amount: -50000,
    date: "2024-03-12",
    status: "completed",
  },
  { id: "TRX004", type: "gift", from: "João Pedro", amount: 1000, date: "2024-03-10", status: "completed" },
  { id: "TRX005", type: "gift", from: "Maria Silva", amount: 2500, date: "2024-03-08", status: "completed" },
  {
    id: "TRX006",
    type: "withdrawal",
    from: "Multicaixa Express",
    amount: -25000,
    date: "2024-03-05",
    status: "pending",
  },
]

export default function WalletPage() {
  const [withdrawAmount, setWithdrawAmount] = React.useState("")

  return (
    <div className="min-h-screen bg-background">
      <Navbar userLoggedIn={true} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Minha Carteira</h1>
            <p className="text-muted-foreground mt-1">Gere os teus ganhos e levanta o dinheiro com segurança.</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/10 bg-white/5 font-bold">
              Ver Dashboard
            </Button>
          </Link>
        </div>

        {/* Balance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/20 bg-linear-to-br from-primary/10 to-transparent backdrop-blur-xl col-span-1 md:col-span-2 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 opacity-10 group-hover:scale-110 transition-transform">
              <Wallet className="w-40 h-40" />
            </div>
            <CardHeader>
              <CardDescription className="uppercase tracking-widest font-bold text-xs">
                Saldo Disponível
              </CardDescription>
              <CardTitle className="text-5xl md:text-6xl font-black mt-2">
                125,000 <span className="text-primary text-3xl">Kz</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-green-500 font-bold">
                  <TrendingUp className="h-4 w-4" />
                  +18% vs mês passado
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
                    <Gift className="h-3 w-3" /> Gifts Recebidos
                  </p>
                  <p className="text-2xl font-black">45,200 Kz</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
                    <Users className="h-3 w-3" /> Subscrições
                  </p>
                  <p className="text-2xl font-black">79,800 Kz</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-lg shadow-primary/20">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Levantar Dinheiro
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 font-bold h-12">
                  <Download className="mr-2 h-4 w-4" /> Extrato
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" /> Este Mês
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Recebido</span>
                  <span className="text-lg font-bold text-green-500">+85,400 Kz</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Levantado</span>
                  <span className="text-lg font-bold text-red-500">-75,000 Kz</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Lucro Líquido</span>
                  <span className="text-xl font-black text-primary">+10,400 Kz</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Próximo Pagamento</p>
                <p className="text-lg font-bold">1º Abril 2024</p>
                <p className="text-xs text-muted-foreground mt-2">Pagamento automático via Multicaixa Express</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Withdrawal Section & Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdrawal Form */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-primary" /> Levantar Dinheiro
              </CardTitle>
              <CardDescription>Transfere os teus ganhos para a tua conta Multicaixa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Montante a Levantar</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="5000"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="pl-16 h-12 bg-white/5 border-white/10 text-lg font-bold"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">Kz</div>
                </div>
                <p className="text-xs text-muted-foreground">Mínimo: 5,000 Kz • Taxa: 2%</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Método de Pagamento</Label>
                <Select defaultValue="multicaixa">
                  <SelectTrigger className="h-12 bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multicaixa">Multicaixa Express</SelectItem>
                    <SelectItem value="reference">Referência Multicaixa</SelectItem>
                    <SelectItem value="bank">Transferência Bancária</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Número de Conta</Label>
                <Input
                  id="account"
                  placeholder="00XX XXXX XXXX XXXX"
                  className="h-12 bg-white/5 border-white/10 font-mono"
                />
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-yellow-500">Processamento em 24-48h</p>
                  <p className="text-xs text-muted-foreground">
                    Levantamentos são processados de segunda a sexta, entre 8h-17h.
                  </p>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12">
                Confirmar Levantamento
              </Button>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>Visualiza todas as tuas movimentações financeiras</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold">
                Ver Tudo
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="income">Recebidas</TabsTrigger>
                  <TabsTrigger value="withdrawals">Levantamentos</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-0">
                  {transactionHistory.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "withdrawal"
                              ? "bg-red-500/10 text-red-500"
                              : tx.type === "gift"
                                ? "bg-secondary/10 text-secondary"
                                : "bg-primary/10 text-primary"
                          }`}
                        >
                          {tx.type === "withdrawal" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : tx.type === "gift" ? (
                            <Gift className="h-5 w-5" />
                          ) : (
                            <Users className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">
                            {tx.type === "withdrawal"
                              ? "Levantamento"
                              : tx.type === "gift"
                                ? "Presente Recebido"
                                : "Subscrição"}
                          </p>
                          <p className="text-xs text-muted-foreground">{tx.from}</p>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className={`text-lg font-black ${tx.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount.toLocaleString()} Kz
                          </p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        {tx.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="income" className="space-y-4 mt-0">
                  {transactionHistory
                    .filter((tx) => tx.amount > 0)
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === "gift" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                            }`}
                          >
                            {tx.type === "gift" ? <Gift className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{tx.type === "gift" ? "Presente" : "Subscrição"}</p>
                            <p className="text-xs text-muted-foreground">{tx.from}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-green-500">+{tx.amount.toLocaleString()} Kz</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="withdrawals" className="space-y-4 mt-0">
                  {transactionHistory
                    .filter((tx) => tx.amount < 0)
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500/10 text-red-500">
                            <ArrowDownLeft className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Levantamento</p>
                            <p className="text-xs text-muted-foreground">{tx.from}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div>
                            <p className="text-lg font-black text-red-500">{tx.amount.toLocaleString()} Kz</p>
                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                          </div>
                          {tx.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Section */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Métodos de Pagamento
            </CardTitle>
            <CardDescription>Gere as tuas contas bancárias e métodos de levantamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Multicaixa Express</p>
                    <p className="text-xs text-muted-foreground">•••• •••• 1234</p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary border-none">Ativo</Badge>
              </div>

              <Button
                variant="outline"
                className="h-full min-h-[80px] border-white/10 border-dashed bg-transparent hover:border-primary hover:bg-white/5 font-bold"
              >
                + Adicionar Método
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
