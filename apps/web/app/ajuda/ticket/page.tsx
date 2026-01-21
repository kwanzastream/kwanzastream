"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function TicketPage() {
  const [category, setCategory] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [priority, setPriority] = React.useState("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio de ticket
    alert("Ticket criado com sucesso! Entraremos em contacto em breve.")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/ajuda">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Ajuda
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Abrir Ticket de Suporte</CardTitle>
              <CardDescription>
                Descreve o teu problema e entraremos em contacto o mais rápido possível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleciona uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Problema Técnico</SelectItem>
                      <SelectItem value="account">Conta e Autenticação</SelectItem>
                      <SelectItem value="payment">Pagamentos e Wallet</SelectItem>
                      <SelectItem value="streaming">Streaming e Lives</SelectItem>
                      <SelectItem value="event">Eventos</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto *</Label>
                  <Input
                    id="subject"
                    placeholder="Resumo do problema"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Detalhada *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreve o problema em detalhe. Inclui passos para reproduzir, mensagens de erro, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
