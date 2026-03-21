"use client"

import { Monitor, Image, Video, Code } from "lucide-react"

export default function EspecificacoesPage() {
  const specs = [
    { icon: Image, title: "Banner Estático", items: [
      "Formato: PNG ou JPG", "Dimensões: 1280×720px (16:9)", "Peso máximo: 2MB",
      "Safe zone: 90% da área (margens de 10%)", "Texto: máximo 20% da área da imagem", "Fundo: evitar branco puro (#FFF)"
    ]},
    { icon: Video, title: "Vídeo Pre-roll (em breve)", items: [
      "Formato: MP4 (H.264)", "Duração: máximo 30 segundos", "Resolução: 1280×720px mínimo",
      "Peso máximo: 50MB", "Áudio: AAC, 128kbps mínimo", "Framerate: 30fps"
    ]},
    { icon: Code, title: "Overlay HTML5 (só managed)", items: [
      "Dimensões: 300×250px ou 728×90px", "Formato: HTML5 + ZIP", "Peso máximo: 150KB",
      "Animação: máximo 15 segundos", "Sem auto-play de áudio", "Compatível com Chrome 80+"
    ]},
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <Monitor className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Especificações Técnicas</h1>
      <p className="text-sm text-muted-foreground">Guia técnico para preparar criativos publicitários</p>

      {specs.map((s, i) => (
        <div key={i} className="p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center gap-2"><s.icon className="w-5 h-5 text-primary" /><h2 className="text-sm font-semibold">{s.title}</h2></div>
          <div className="grid grid-cols-2 gap-1">
            {s.items.map((item, j) => <p key={j} className="text-xs text-muted-foreground">· {item}</p>)}
          </div>
        </div>
      ))}

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
        💡 Dica: usa cores escuras e contraste alto — a maioria dos viewers usa dark mode.
      </div>
    </div>
  )
}
