"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, UserPlus, Mail, Shield, Trash2, Search } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function InstitutionMembersPage() {
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("member")

  // Mock data
  const members = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@exemplo.com",
      role: "admin",
      avatar: "/abstract-profile.png",
      joined: "15 Jan, 2025"
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@exemplo.com",
      role: "moderator",
      avatar: "/abstract-profile.png",
      joined: "20 Jan, 2025"
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@exemplo.com",
      role: "member",
      avatar: "/abstract-profile.png",
      joined: "1 Fev, 2025"
    }
  ]

  const roles = [
    { value: "admin", label: "Administrador", description: "Acesso total à conta" },
    { value: "moderator", label: "Moderador", description: "Pode moderar eventos e conteúdo" },
    { value: "member", label: "Membro", description: "Acesso básico" }
  ]

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      alert(`Convite enviado para ${inviteEmail}`)
      setInviteEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/instituicao">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Membros & Equipe
              </h1>
              <p className="text-muted-foreground">
                Gerencia permissões e convida membros da equipe
              </p>
            </div>
          </div>

          {/* Invite Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Convidar Novo Membro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="invite-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="membro@exemplo.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Cargo</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger id="invite-role" className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleInvite} className="w-full md:w-auto">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Enviar Convite
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Membros da Equipe ({members.length})
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Pesquisar membros..." className="pl-9 w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          <Badge
                            variant={
                              member.role === "admin"
                                ? "default"
                                : member.role === "moderator"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {roles.find((r) => r.value === member.role)?.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">Membro desde {member.joined}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Roles Info */}
          <Card>
            <CardHeader>
              <CardTitle>Permissões por Cargo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <div key={role.value} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <h3 className="font-bold">{role.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
