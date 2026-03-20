"use client"
import { useState } from "react"
import { ArrowLeft, Check, Clock, Key, Radio, MessageCircle, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SECTIONS = [
  { id: "essencial", icon: Key, title: "O essencial", time: "2 min", items: ["Obtém a tua stream key em Dashboard → Stream Config", "Instala o OBS Studio (grátis) ou usa o telemóvel", "Cola a URL e chave no OBS: Definições → Stream → Personalizado"] },
  { id: "primeiro", icon: Radio, title: "O teu primeiro stream", time: "5 min", items: ["Escolhe um título — curto e descritivo", "Selecciona a categoria (Gaming, Música, etc.)", "Define classificação de idade", "Privacidade: público (recomendado para o primeiro)", "Clica 'Iniciar Stream' e transmite por 30+ min"] },
  { id: "comunidade", icon: MessageCircle, title: "Interagir com a comunidade", time: "3 min", items: ["Lê e responde a mensagens no chat", "Agradece Salos e subscrições em voz alta", "Pede aos viewers para seguirem o canal", "Usa emotes da plataforma no chat"] },
  { id: "apos", icon: BarChart3, title: "Após o stream", time: "2 min", items: ["Verifica as métricas em Analytics", "Guarda o VOD se quiseres (fica automático)", "Cria um clip de um momento memorável", "Partilha o clip nas redes sociais"] },
]

export default function GuiaRapidoPage() {
  const [read, setRead] = useState<string[]>([])
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/inicio"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Guia Rápido</h1></div>
      <p className="text-xs text-muted-foreground">4 secções · ~12 minutos no total</p>
      {SECTIONS.map(s => (
        <div key={s.id} className={`rounded-2xl border transition-all ${read.includes(s.id) ? "border-green-500/20 bg-green-500/5 opacity-70" : "border-white/10"}`}>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><s.icon className="w-4 h-4 text-primary" /><p className="text-sm font-bold">{s.title}</p></div><span className="text-[9px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{s.time}</span></div>
            <ul className="space-y-1 pl-1">{s.items.map((item, i) => <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1"><span className="text-primary">→</span>{item}</li>)}</ul>
            <button onClick={() => setRead(read.includes(s.id) ? read.filter(r => r !== s.id) : [...read, s.id])} className={`text-[9px] font-bold ${read.includes(s.id) ? "text-green-400" : "text-primary"}`}>{read.includes(s.id) ? <span className="flex items-center gap-1"><Check className="w-3 h-3" />Lido</span> : "Marcar como lido"}</button>
          </div>
        </div>
      ))}
    </div>
  )
}
