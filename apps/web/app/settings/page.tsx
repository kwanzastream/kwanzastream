"use client"
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  ShieldCheckIcon as ShieldLockIcon,
  Eye,
  Bell,
  Wallet,
  Globe,
  Camera,
  ChevronRight,
  LogOut,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useTranslation, LOCALE_NAMES, LOCALE_FLAGS, type Locale } from "@/lib/i18n"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-8 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/feed">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <h1 className="text-xl font-black tracking-tight uppercase">Definições da Conta</h1>
        </div>
        <Button variant="ghost" className="text-destructive font-bold hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <Tabs defaultValue="perfil" className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 lg:w-72 border-r border-white/10 overflow-y-auto shrink-0">
            <TabsList className="flex flex-col h-auto w-full bg-transparent p-4 gap-1 items-start">
              <SettingsTabTrigger value="perfil" icon={<User />} label="Perfil" />
              <SettingsTabTrigger value="seguranca" icon={<ShieldLockIcon />} label="Conta e Segurança" />
              <SettingsTabTrigger value="privacidade" icon={<Eye />} label="Privacidade" />
              <SettingsTabTrigger value="notificacoes" icon={<Bell />} label="Notificações" />
              <SettingsTabTrigger value="monetizacao" icon={<Wallet />} label="Monetização" />
              <SettingsTabTrigger value="idioma" icon={<Globe />} label="Idioma e Região" />
            </TabsList>
          </aside>

          {/* Main Settings Content */}
          <ScrollArea className="flex-1 bg-white/[0.02]">
            <div className="p-4 md:p-10 max-w-3xl mx-auto space-y-10 pb-32">
              <TabsContent value="perfil" className="mt-0 space-y-8">
                <section className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">O Teu Perfil</h3>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-2 ring-white/10 rounded-2xl">
                        <AvatarImage src="/abstract-profile.png" alt="Elsio Costa" />
                        <AvatarFallback>EC</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-2 right-2 rounded-lg h-10 w-10 shadow-xl border border-white/10"
                      >
                        <Camera className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue="Elsio Costa" className="bg-white/5 border-white/10 h-11" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username (@)</Label>
                        <div className="relative">
                          <Input id="username" defaultValue="elsiocosta" className="bg-white/5 border-white/10 h-11" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="min-h-[100px] w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Conta a tua história para Angola..."
                      defaultValue="Criador de conteúdo focado em tecnologia e o futuro digital de Angola. 🇦🇴"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label>Localização</Label>
                      <Select defaultValue="luanda">
                        <SelectTrigger className="bg-white/5 border-white/10 h-11">
                          <SelectValue placeholder="Selecionar província" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luanda">Luanda</SelectItem>
                          <SelectItem value="benguela">Benguela</SelectItem>
                          <SelectItem value="huambo">Huambo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://..." className="bg-white/5 border-white/10 h-11" />
                    </div>
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-white font-black h-12 px-10 rounded-xl">
                    Salvar Alterações
                  </Button>
                </section>
              </TabsContent>

              <TabsContent value="seguranca" className="mt-0 space-y-8">
                <section className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">Segurança</h3>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" /> Verificação em Duas Etapas
                      </CardTitle>
                      <CardDescription>Adiciona uma camada extra de proteção à tua conta.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground font-medium">Recomendado para todos os creators</p>
                      <Switch className="data-[state=checked]:bg-primary" />
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      Sessões Ativas
                    </h4>
                    <div className="space-y-2">
                      <SessionItem device="iPhone 15 Pro" location="Luanda, Angola" status="Ativo agora" />
                      <SessionItem device="MacBook Pro" location="Benguela, Angola" status="Há 2 dias" />
                    </div>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="idioma" className="mt-0 space-y-8">
                <section className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">Idioma e Região</h3>
                  <LanguageSelector />
                </section>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}

function SettingsTabTrigger({ value, icon, label }: any) {
  return (
    <TabsTrigger
      value={value}
      className="w-full justify-start gap-4 px-4 py-3 rounded-xl border-none text-muted-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-none transition-all font-bold group"
    >
      <span className="shrink-0 transition-transform group-hover:scale-110">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </span>
      <span className="flex-1 text-left text-sm">{label}</span>
      <ChevronRight className="h-4 w-4 opacity-0 group-data-[state=active]:opacity-100 transition-opacity" />
    </TabsTrigger>
  )
}

function SessionItem({ device, location, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground">
          <Smartphone className="h-5 w-5" />
        </div>
        <div>
          <h5 className="text-sm font-bold">{device}</h5>
          <p className="text-xs text-muted-foreground">
            {location} • {status}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-xs font-bold text-red-500 hover:bg-red-500/10">
        Terminar
      </Button>
    </div>
  )
}

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function LanguageSelector() {
  const { locale, setLocale } = useTranslation()
  const locales: Locale[] = ['pt-AO', 'en']
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Escolhe o idioma da plataforma</p>
      {locales.map(l => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${locale === l
              ? 'border-primary bg-primary/10 ring-1 ring-primary'
              : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
        >
          <span className="text-2xl">{LOCALE_FLAGS[l]}</span>
          <div className="flex-1 text-left">
            <p className="font-bold text-sm">{LOCALE_NAMES[l]}</p>
            <p className="text-xs text-muted-foreground">
              {l === 'pt-AO' ? 'Idioma padrão da plataforma' : 'Platform default language'}
            </p>
          </div>
          {locale === l && <span className="text-primary font-bold text-sm">✓ Activo</span>}
        </button>
      ))}
    </div>
  )
}
