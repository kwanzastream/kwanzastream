'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  AlertCircle,
  Settings,
  LogOut,
  Filter,
  Search,
  Radio,
  Shield,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Loading from './loading'

// Mock data
const dashboardStats = {
  totalUsers: 15234,
  activeCreators: 892,
  totalRevenue: 52500000,
  totalTransactions: 148734,
  platformShare: 15750000,
  creatorEarnings: 36750000,
}

const revenueData = [
  { date: '01/Jan', revenue: 1200000, transactions: 340 },
  { date: '02/Jan', revenue: 1890000, transactions: 521 },
  { date: '03/Jan', revenue: 2390000, transactions: 654 },
  { date: '04/Jan', revenue: 2490000, transactions: 712 },
  { date: '05/Jan', revenue: 2000000, transactions: 589 },
  { date: '06/Jan', revenue: 2181000, transactions: 698 },
  { date: '07/Jan', revenue: 2500000, transactions: 745 },
]

const transactionBreakdown = [
  { name: 'Salos', value: 60, color: '#ef4444' },
  { name: 'Deposits', value: 25, color: '#3b82f6' },
  { name: 'Withdrawals', value: 10, color: '#10b981' },
  { name: 'Fees', value: 5, color: '#f59e0b' },
]

const flaggedContent = [
  {
    id: 1,
    creator: 'Ninja Angolano',
    streamTitle: 'Gaming Tournament Ep. 5',
    reason: 'Inappropriate language',
    timestamp: '2 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    creator: 'DJ Beats',
    streamTitle: 'Live DJ Set',
    reason: 'Copyright complaint',
    timestamp: '5 hours ago',
    status: 'reviewed',
  },
  {
    id: 3,
    creator: 'Tech Talk',
    streamTitle: 'Crypto Discussion',
    reason: 'Potential scam content',
    timestamp: '1 day ago',
    status: 'resolved',
  },
]

const topCreators = [
  { id: 1, name: 'Ninja Angolano', earnings: 5200000, streams: 48, followers: 125000 },
  { id: 2, name: 'Preto Show', earnings: 4800000, streams: 42, followers: 98000 },
  { id: 3, name: 'DJ Anselmo', earnings: 3900000, streams: 35, followers: 87000 },
  { id: 4, name: 'Tech Angola', earnings: 2100000, streams: 28, followers: 45000 },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'moderation' | 'users' | 'analytics'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform management & analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="bg-transparent">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="bg-transparent">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-t border-white/10 px-6">
          {(['overview', 'moderation', 'users', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-3 border-b-2 text-sm font-medium transition-colors ${selectedTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {selectedTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-white/10">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Users</span>
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-emerald-400">+12% this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Creators</span>
                      <TrendingUp className="h-4 w-4 text-secondary" />
                    </div>
                    <p className="text-3xl font-bold">{dashboardStats.activeCreators.toLocaleString()}</p>
                    <p className="text-xs text-emerald-400">+8% this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Platform Revenue</span>
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                    </div>
                    <p className="text-3xl font-bold">
                      {(dashboardStats.platformShare / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-emerald-400">+15% this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Transactions</span>
                      <Eye className="h-4 w-4 text-amber-400" />
                    </div>
                    <p className="text-3xl font-bold">{(dashboardStats.totalTransactions / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-emerald-400">+22% this month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#ef4444"
                        dot={false}
                        name="Revenue (Kz)"
                      />
                      <Line type="monotone" dataKey="transactions" stroke="#3b82f6" dot={false} name="Transactions" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-white/10">
                <CardHeader>
                  <CardTitle className="text-base">Transaction Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={transactionBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {transactionBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Creators */}
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Top Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCreators.map((creator, index) => (
                    <div key={creator.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{creator.name}</p>
                          <p className="text-xs text-muted-foreground">{creator.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{(creator.earnings / 1000000).toFixed(1)}M Kz</p>
                        <p className="text-xs text-muted-foreground">{creator.streams} streams</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admin Quick Navigation */}
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Gestão Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { href: '/admin/users', icon: <Users className="h-5 w-5" />, label: 'Utilizadores', desc: 'Gerir contas e acessos', color: 'text-blue-400 bg-blue-500/10' },
                    { href: '/admin/streams', icon: <Radio className="h-5 w-5" />, label: 'Streams', desc: 'Monitorizar lives', color: 'text-red-400 bg-red-500/10' },
                    { href: '/admin/kyc', icon: <Shield className="h-5 w-5" />, label: 'KYC', desc: 'Verificações pendentes', color: 'text-amber-400 bg-amber-500/10' },
                    { href: '/admin/settings', icon: <Settings className="h-5 w-5" />, label: 'Configurações', desc: 'Feature flags e taxas', color: 'text-purple-400 bg-purple-500/10' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedTab === 'moderation' && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search flagged content..."
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Flagged Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flaggedContent.map((item) => (
                    <div key={item.id} className="border border-white/10 rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{item.streamTitle}</p>
                          <p className="text-sm text-muted-foreground">by {item.creator}</p>
                        </div>
                        <Badge
                          className={
                            item.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300'
                              : item.status === 'reviewed'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            <AlertCircle className="inline h-4 w-4 mr-2" />
                            {item.reason}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Review
                          </Button>
                          <Button size="sm" variant="outline" className="bg-red-500/10 text-red-400 hover:bg-red-500/20">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedTab === 'users' && (
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-base">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User management tools coming soon...</p>
            </CardContent>
          </Card>
        )}

        {selectedTab === 'analytics' && (
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-base">Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed analytics coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
