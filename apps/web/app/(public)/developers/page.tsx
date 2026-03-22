"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Bot, Layers, BarChart3, Smartphone, Wrench, ArrowRight } from "lucide-react"

export default function DevelopersLandingPage() {
  const features = [
    { icon: Bot, title: "Bots de chat", desc: "Moderação automática, comandos, mini-jogos" },
    { icon: Code, title: "Overlays para OBS", desc: "Alertas, goals, widgets de stream" },
    { icon: BarChart3, title: "Dashboards de analytics", desc: "Métricas personalizadas do canal" },
    { icon: Layers, title: "Extensões interactivas", desc: "Painel de viewer overlay" },
    { icon: Smartphone, title: "Apps mobile", desc: "Login com Kwanza Stream via OAuth" },
  ]
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center space-y-4">
        <Wrench className="w-12 h-12 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Kwanza Stream Developers</h1>
        <p className="text-lg text-muted-foreground">Constrói sobre a plataforma angolana</p>
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span>API v1</span><span>·</span><span>REST + WebSocket</span><span>·</span><span>Docs em PT-AO</span><span>·</span><span>Sandbox</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((f, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-1 text-center">
            <f.icon className="w-5 h-5 text-primary mx-auto" /><p className="text-sm font-medium">{f.title}</p><p className="text-[10px] text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link href="/developers/docs/introducao"><Button className="gap-1.5">Começar <ArrowRight className="w-3 h-3" /></Button></Link>
        <Link href="/developers/docs"><Button variant="outline">Documentação</Button></Link>
        <Link href="/developers/console"><Button variant="outline">Console</Button></Link>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link href="/developers/overview" className="hover:text-foreground">Overview</Link>
        <Link href="/developers/changelog" className="hover:text-foreground">Changelog</Link>
        <Link href="/developers/status" className="hover:text-foreground">Status</Link>
        <Link href="/developers/showcase" className="hover:text-foreground">Showcase</Link>
        <Link href="/developers/forum" className="hover:text-foreground">Fórum</Link>
      </div>
    </div>
  )
}
