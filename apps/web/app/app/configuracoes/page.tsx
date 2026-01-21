"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Shield, Bell, Smartphone, Trash2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/app">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
              Configurações
            </h1>
            <p className="text-muted-foreground">
              Gerencia as tuas preferências e dados pessoais
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 mr-2" />
                Segurança
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="devices">
                <Smartphone className="w-4 h-4 mr-2" />
                Dispositivos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>
                    Atualiza as tuas informações de perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" defaultValue="Nome do Usuário" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="usuario" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="usuario@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" type="tel" defaultValue="+244 923 456 789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="Descrição do perfil..."
                    />
                  </div>
                  <Button>Guardar Alterações</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Perfil Público</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite que outros usuários vejam o teu perfil
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mostrar Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Exibe o teu email no perfil público
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Atualiza a tua senha para manter a conta segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Alterar Senha</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autenticação de Dois Fatores</CardTitle>
                  <CardDescription>
                    Adiciona uma camada extra de segurança à tua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>2FA Ativado</Label>
                      <p className="text-sm text-muted-foreground">
                        Requer código adicional no login
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Salos Recebidos</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifica quando recebes Salos
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lives Iniciadas</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifica quando criadores que segues iniciam lives
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Eventos</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifica sobre novos eventos e lembretes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Recebe notificações no dispositivo
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dispositivos Conectados</CardTitle>
                  <CardDescription>
                    Gerencia os dispositivos com acesso à tua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Chrome no Windows</p>
                        <p className="text-sm text-muted-foreground">Luanda, Angola • Ativo agora</p>
                      </div>
                      <Badge>Atual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Safari no iPhone</p>
                        <p className="text-sm text-muted-foreground">Luanda, Angola • 2 dias atrás</p>
                      </div>
                      <Button variant="outline" size="sm">Desconectar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-600/50">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona Perigosa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Eliminar Conta</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Esta ação não pode ser desfeita. Todos os teus dados serão permanentemente eliminados.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar Conta
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
