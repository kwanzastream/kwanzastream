"use client"
import { ArrowLeft, Film, Monitor, Smartphone, Globe, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CATEGORIES = [
  { icon: Film, label: "🎬 Produção", color: "text-blue-400", items: [
    { title: "Guia de iluminação para streamers", desc: "Como usar luz natural e lâmpadas baratas", format: "Artigo" },
    { title: "Áudio — o mais importante", desc: "Mic bom > câmara boa", format: "Artigo" },
    { title: "Cenário simples e eficaz", desc: "Fundo limpo, sem distracções", format: "Vídeo" },
  ]},
  { icon: Monitor, label: "💻 Técnico", color: "text-green-400", items: [
    { title: "Tutorial OBS Studio", desc: "Configurar do zero em 10 minutos", format: "Vídeo" },
    { title: "Resolução de problemas", desc: "Lag, áudio dessincronizado, frames perdidos", format: "Artigo" },
    { title: "Streamlabs OBS vs OBS Studio", desc: "Qual escolher?", format: "Artigo" },
  ]},
  { icon: Smartphone, label: "📱 Mobile", color: "text-yellow-400", items: [
    { title: "Transmitir pelo telemóvel", desc: "Sem PC, sem problemas", format: "Vídeo" },
    { title: "Poupar dados e bateria", desc: "Dicas para streams longos no telemóvel", format: "Artigo" },
  ]},
  { icon: Globe, label: "🌍 Angola", color: "text-red-400", items: [
    { title: "Encontrar audiência angolana", desc: "Categorias populares, melhores horários", format: "Artigo" },
    { title: "Melhores horários para stream", desc: "Quando os angolanos estão online", format: "Artigo" },
  ]},
  { icon: DollarSign, label: "💰 Monetização", color: "text-primary", items: [
    { title: "Como activar Salos", desc: "Recebe doações dos viewers", format: "Artigo" },
    { title: "Subscrições de canal", desc: "3 tiers e como maximizar retenção", format: "Artigo" },
  ]},
  { icon: Users, label: "🤝 Comunidade", color: "text-purple-400", items: [
    { title: "Construir uma tribo", desc: "De 0 a 100 seguidores", format: "Artigo" },
    { title: "Moderar o chat", desc: "AutoMod, moderadores, regras", format: "Artigo" },
  ]},
]

export default function RecursosPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3"><Link href="/dashboard/inicio"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Recursos para Criadores</h1></div>
      {CATEGORIES.map(cat => (
        <div key={cat.label} className="space-y-2">
          <h2 className={`text-sm font-bold flex items-center gap-2 ${cat.color}`}><cat.icon className="w-4 h-4" />{cat.label}</h2>
          <div className="space-y-1">{cat.items.map(item => <div key={item.title} className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-primary/20 transition-all"><div className="flex-1"><p className="text-xs font-bold">{item.title}</p><p className="text-[8px] text-muted-foreground">{item.desc}</p></div><span className="text-[8px] text-muted-foreground px-2 py-0.5 rounded bg-white/5">{item.format}</span></div>)}</div>
        </div>
      ))}
    </div>
  )
}
