"use client"

import { Shield, CheckCircle, XCircle } from "lucide-react"

export default function PoliticasPage() {
  const allowed = [
    "Marcas registadas em Angola ou com representação local",
    "Produtos e serviços legais em Angola",
    "Linguagem respeitosa em PT-AO",
    "Criativos 1280×720px (imagem) ou até 30s (vídeo)",
    "URL de destino funcional e segura (HTTPS)",
    "Conteúdo adequado para todas as idades (salvo targeting 18+)",
  ]

  const prohibited = [
    "Álcool (para audiência menor de 18 anos)",
    "Tabaco e produtos de vaping",
    "Conteúdo sexual ou pornográfico",
    "Conteúdo politicamente parcial ou propaganda",
    "Concorrentes directos da plataforma",
    "Esquemas financeiros, pirâmides ou scams",
    "Armas de fogo ou artigos ilegais",
    "Medicamentos sem autorização do INFARMED Angola",
    "Discriminação por género, raça, religião ou orientação",
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <Shield className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Políticas de Publicidade</h1>
      <p className="text-sm text-muted-foreground">Todas as campanhas são revistas pela nossa equipa antes de entrar em live</p>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />O que é permitido</h2>
        {allowed.map((a, i) => <p key={i} className="text-xs text-muted-foreground pl-6">✓ {a}</p>)}
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" />O que não é permitido</h2>
        {prohibited.map((p, i) => <p key={i} className="text-xs text-muted-foreground pl-6">✗ {p}</p>)}
      </div>

      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">
        ⚠️ Campanhas que violem estas políticas serão rejeitadas. Contacta ads@kwanzastream.ao para esclarecimentos.
      </div>
    </div>
  )
}
