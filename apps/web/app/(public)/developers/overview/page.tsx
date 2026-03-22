"use client"

import { Code, Bot, Layers, Globe, Smartphone, Wrench, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OverviewPage() {
  const capabilities = [
    { icon: Globe, title: "API REST", desc: "Acesso a streams, canais, chat, analytics. Rate limit: 1.000 req/min em produção." },
    { icon: Zap, title: "WebSocket / EventSub", desc: "Eventos em tempo real: stream online/offline, follows, subscriptions, chat." },
    { icon: Bot, title: "Chat Bots", desc: "Envia e lê mensagens no chat. Comandos personalizados, moderação automática." },
    { icon: Code, title: "Overlays", desc: "Widgets HTML para OBS/Streamlabs. Alertas, goals, leaderboards." },
    { icon: Layers, title: "Extensões", desc: "Painéis interactivos sobre o player de vídeo. Monetizáveis em v2." },
    { icon: Smartphone, title: "OAuth Login", desc: "Login com Kwanza Stream na tua app. Acesso a perfil, streams, wallet." },
    { icon: Shield, title: "Webhooks", desc: "Notificações server-to-server. Verificação via HMAC-SHA256." },
  ]
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <Wrench className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">O que podes construir</h1>
      <p className="text-sm text-muted-foreground">A API do Kwanza Stream permite integrar a plataforma em qualquer aplicação</p>
      <div className="space-y-4">
        {capabilities.map((c, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/10">
            <c.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div><p className="text-sm font-semibold">{c.title}</p><p className="text-xs text-muted-foreground">{c.desc}</p></div>
          </div>
        ))}
      </div>
      <Link href="/developers/docs/introducao"><Button className="w-full">Começar a construir</Button></Link>
    </div>
  )
}
