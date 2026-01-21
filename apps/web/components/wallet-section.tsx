'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Wallet,
  Plus,
  Send,
  TrendingUp,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  Building2,
  Eye,
  EyeOff,
} from 'lucide-react'
import * as React from 'react'

interface Transaction {
  id: string
  type: 'income' | 'expense' | 'deposit' | 'withdrawal'
  description: string
  amount: number
  timestamp: string
  status: 'completed' | 'pending'
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    description: 'Salo: Pãozinho de DJ Elite',
    amount: 50,
    timestamp: '2 minutos atrás',
    status: 'completed',
  },
  {
    id: '2',
    type: 'income',
    description: 'Salo: Rei de Gaming Pro',
    amount: 20000,
    timestamp: '15 minutos atrás',
    status: 'completed',
  },
  {
    id: '3',
    type: 'deposit',
    description: 'Recarga via Multicaixa',
    amount: 50000,
    timestamp: '1 hora atrás',
    status: 'completed',
  },
  {
    id: '4',
    type: 'expense',
    description: 'Salo: Copo para Music Stream',
    amount: 500,
    timestamp: '3 horas atrás',
    status: 'completed',
  },
  {
    id: '5',
    type: 'withdrawal',
    description: 'Saque para Unitel Money',
    amount: 25000,
    timestamp: '1 dia atrás',
    status: 'pending',
  },
]

export function WalletSection({ isCreator = false }: { isCreator?: boolean }) {
  const [showBalance, setShowBalance] = React.useState(true)

  return (
    <div className="space-y-6">
      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Available Balance */}
        <Card className="border-white/10 bg-gradient-to-br from-primary/20 to-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Saldo Disponível
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <div>
                <p className="text-4xl font-black text-primary">
                  {showBalance ? (1_250_000).toLocaleString() : '****'}
                </p>
                <p className="text-xs text-muted-foreground pt-1">Kwanzas</p>
              </div>
              <Button size="sm" className="w-full gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Carregar Saldo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* This Month Earnings (for creators) */}
        {isCreator && (
          <Card className="border-white/10 bg-gradient-to-br from-secondary/20 to-secondary/5">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Ganhos Este Mês
                  </span>
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-4xl font-black text-secondary">
                    {(2_845_000).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">Kwanzas</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  +23% vs. mês passado
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Actions */}
        <Card className="border-white/10 bg-gradient-to-br from-accent/20 to-accent/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Ações Pendentes
                </span>
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-black text-accent">1</p>
                <p className="text-xs text-muted-foreground pt-1">
                  Saque em processamento
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2 border-accent/50 bg-transparent"
              >
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
          <Plus className="w-5 h-5" />
          <span className="text-xs">Carregar Saldo</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
          <Send className="w-5 h-5" />
          <span className="text-xs">Enviar Salo</span>
        </Button>
        {isCreator && (
          <>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <ArrowUpRight className="w-5 h-5" />
              <span className="text-xs">Solicitar Saque</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Ver Análise</span>
            </Button>
          </>
        )}
      </div>

      {/* Payment Methods */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Métodos de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Multicaixa */}
            <div className="p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Multicaixa Express</p>
                    <p className="text-xs text-muted-foreground">Recarga rápida</p>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full" variant="secondary">
                Carregar via MCX
              </Button>
            </div>

            {/* USSD */}
            <div className="p-4 rounded-lg border border-white/10 hover:border-secondary/50 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Unitel Money USSD</p>
                    <p className="text-xs text-muted-foreground">*144#</p>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full" variant="secondary">
                Recarregar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-white/10 bg-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Histórico de Transações</CardTitle>
            <Badge variant="secondary">Últimas 5</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Transaction Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'income' || tx.type === 'deposit'
                        ? 'bg-green-500/20'
                        : 'bg-red-500/20'
                    }`}
                  >
                    {tx.type === 'income' || tx.type === 'deposit' ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{tx.description}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tx.timestamp}
                    </p>
                  </div>
                </div>

                {/* Amount & Status */}
                <div className="text-right">
                  <p
                    className={`font-bold text-sm ${
                      tx.type === 'income' || tx.type === 'deposit'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {tx.type === 'income' || tx.type === 'deposit' ? '+' : '-'}
                    {tx.amount.toLocaleString()} Kz
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-xs mt-1 ${
                      tx.status === 'completed'
                        ? 'bg-green-500/10 text-green-300 border-green-500/30'
                        : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                    }`}
                  >
                    {tx.status === 'completed' ? 'Concluída' : 'Pendente'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Ver Todos os Históricos
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
