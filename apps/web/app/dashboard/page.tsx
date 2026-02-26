"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import {
  TrendingUp,
  Users,
  Video,
  Wallet,
  Download,
  CalendarIcon,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

const earningsData = [
  { name: "Seg", value: 12000 },
  { name: "Ter", value: 18000 },
  { name: "Qua", value: 15000 },
  { name: "Qui", value: 25000 },
  { name: "Sex", value: 22000 },
  { name: "Sab", value: 35000 },
  { name: "Dom", value: 28000 },
]

const viewsData = [
  { name: "Seg", value: 4500 },
  { name: "Ter", value: 5200 },
  { name: "Qua", value: 4800 },
  { name: "Qui", value: 7100 },
  { name: "Sex", value: 6800 },
  { name: "Sab", value: 9500 },
  { name: "Dom", value: 8200 },
]

const genderData = [
  { name: "Masculino", value: 65, color: "var(--primary)" },
  { name: "Feminino", value: 32, color: "var(--secondary)" },
  { name: "Outro", value: 3, color: "var(--muted-foreground)" },
]

const ageData = [
  { group: "13-17", value: 15 },
  { group: "18-24", value: 45 },
  { group: "25-34", value: 25 },
  { group: "35-44", value: 10 },
  { group: "45+", value: 5 },
]

export default function DashboardPage() {
  const { user, isLoggedIn, isLoading, logout } = useAuth()
  const router = useRouter()
  const [period, setPeriod] = React.useState("7d")

  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const totalEarnings = user?.balance || 0
  const totalViews = Math.floor((user?.followers || 0) * 12)
  const newFollowers = Math.floor((user?.followers || 0) * 0.2)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Top Header */}
      <header className="sticky top-16 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl tracking-tighter uppercase">Kwanza Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 rounded-full h-9">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Hoje</SelectItem>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-white/10 hover:bg-white/5 font-bold h-9 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" /> Exportar PDF
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer ring-offset-background transition-all hover:ring-2 hover:ring-primary ring-offset-2">
              <AvatarImage src={user?.avatar || "/abstract-profile.png"} alt={user?.displayName} />
              <AvatarFallback>{user?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="text-destructive hover:bg-destructive/10 h-9 px-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <MetricCard
              title="Ganhos Totais"
              value={`${(totalEarnings / 1000).toFixed(0)}K Kz`}
              trend="+12%"
              trendType="up"
              icon={<Wallet className="h-5 w-5" />}
            />
            <MetricCard
              title="Visualizações"
              value={`${(totalViews / 1000).toFixed(1)}K`}
              trend="+24%"
              trendType="up"
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <MetricCard
              title="Novos Seguidores"
              value={newFollowers.toString()}
              trend="+8%"
              trendType="up"
              icon={<Users className="h-5 w-5" />}
            />
            <MetricCard
              title="Horas Transmitidas"
              value="45h"
              trend="-2%"
              trendType="down"
              icon={<Video className="h-5 w-5" />}
            />
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" /> Histórico de Ganhos
                </CardTitle>
                <CardDescription>Visualização diária dos teus rendimentos</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    value: { label: "Ganhos (Kz)", color: "var(--primary)" },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                      <defs>
                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        tickFormatter={(val) => `${val / 1000}k`}
                      />
                      <Tooltip
                        content={<ChartTooltipContent hideIndicator />}
                        cursor={{ stroke: "var(--primary)", strokeWidth: 2 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorEarnings)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" /> Crescimento de Visualizações
                </CardTitle>
                <CardDescription>Alcance do teu conteúdo nos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    value: { label: "Views", color: "var(--secondary)" },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        tickFormatter={(val) => `${val / 1000}k`}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--secondary)"
                        strokeWidth={4}
                        dot={{ r: 4, fill: "var(--secondary)", strokeWidth: 0 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Demographics */}
            <Card className="border-white/10 bg-white/5 lg:col-span-1">
              <CardHeader>
                <CardTitle>Dados do Público</CardTitle>
                <CardDescription>Género e idade dos teus fãs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="h-[180px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black">{(user?.followers || 0) / 1000}K</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Seguidores</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {genderData.map((g) => (
                    <div key={g.name} className="text-center space-y-1">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{g.name}</p>
                      <p className="text-sm font-black" style={{ color: g.color }}>
                        {g.value}%
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Faixas Etárias</h4>
                  <div className="space-y-3">
                    {ageData.map((a) => (
                      <div key={a.group} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>{a.group}</span>
                          <span>{a.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${a.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Streams & Performance */}
            <Card className="border-white/10 bg-white/5 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Melhores Transmissões</CardTitle>
                  <CardDescription>Lives com maior engajamento e receita</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold">
                  Ver Todas <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="border-white/5">
                    <TableRow className="hover:bg-transparent border-white/5">
                      <TableHead className="w-[300px]">Stream / Data</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead className="text-right">Engagement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <PerformanceRow
                      title="Noite de Kuduro no Cazenga"
                      date="12 Mar 2024"
                      views="45.2K"
                      earnings="18,500 Kz"
                      engagement="8.4%"
                      image="/vibrant-concert-stage.png"
                    />
                    <PerformanceRow
                      title="Aulas de Canto Grátis"
                      date="08 Mar 2024"
                      views="12.1K"
                      earnings="5,200 Kz"
                      engagement="12.1%"
                      image="/recording-studio.png"
                    />
                    <PerformanceRow
                      title="Q&A Especial Seguidores"
                      date="05 Mar 2024"
                      views="8.4K"
                      earnings="3,100 Kz"
                      engagement="15.8%"
                      image="/abstract-profile.png"
                    />
                  </TableBody>
                </Table>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 to-transparent border border-primary/20 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h4 className="text-sm font-bold uppercase tracking-widest">Dica da IA Kwanza</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      O teu público em <span className="text-foreground font-bold">{user?.location || "Luanda"}</span>{" "}
                      está mais ativo entre as <span className="text-foreground font-bold">20h e 22h</span>. Considera
                      fazer uma live amanhã neste horário para aumentar o alcance em até{" "}
                      <span className="text-primary font-bold">15%</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-secondary" />
                      <h4 className="text-sm font-bold uppercase tracking-widest">Temas em Alta</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-bold">
                        #KuduroClassico
                      </Badge>
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-bold">
                        #TechAngola
                      </Badge>
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-bold">
                        #LuandaNoite
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function MetricCard({ title, value, trend, trendType, icon }: any) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
        <div className="w-24 h-24 bg-primary rounded-full blur-2xl" />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</CardTitle>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black mb-1">{value}</div>
        <p
          className={`text-[10px] font-bold flex items-center gap-1 ${trendType === "up" ? "text-green-500" : "text-red-500"}`}
        >
          {trendType === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend} <span className="text-muted-foreground uppercase">vs período anterior</span>
        </p>
      </CardContent>
    </Card>
  )
}

function PerformanceRow({ title, date, views, earnings, engagement, image }: any) {
  return (
    <TableRow className="border-white/5 hover:bg-white/5 transition-colors group">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 rounded-md bg-white/10 overflow-hidden border border-white/10 shrink-0">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{title}</p>
            <p className="text-[10px] text-muted-foreground">{date}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-bold text-xs">{views}</TableCell>
      <TableCell className="font-bold text-xs text-secondary">{earnings}</TableCell>
      <TableCell className="text-right">
        <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary text-[10px] font-black">
          {engagement}
        </Badge>
      </TableCell>
    </TableRow>
  )
}
