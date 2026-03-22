"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
export default function WorkshopDetailPage() {
  const { id } = useParams()
  const workshops: Record<string, any> = {
    w1: { title: "Intro à API do Kwanza Stream", desc: "Aprende a fazer os primeiros pedidos à API REST, autenticar com OAuth, e receber dados de streams ao vivo.", date: "2 Abril 2026 · 14h", instructor: "Equipa Kwanza", prereqs: ["Conhecimento básico de JavaScript", "Conta no Kwanza Stream"] },
    w2: { title: "Construir um Bot de Chat em Node.js", desc: "Cria um bot que modera, responde a comandos e executa mini-jogos no chat.", date: "16 Abril 2026 · 14h", instructor: "Code Luanda", prereqs: ["Node.js instalado", "Experiência com WebSocket básico"] },
  }
  const w = workshops[id as string] || { title: `Workshop ${id}`, desc: "Detalhes do workshop", date: "TBA", instructor: "TBA", prereqs: [] }
  return (<div className="max-w-lg mx-auto px-4 py-8 space-y-6">
    <Link href="/educacao/coding/workshops" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Workshops</Link>
    <h1 className="text-xl font-bold">{w.title}</h1>
    <p className="text-sm">{w.desc}</p>
    <div className="p-3 rounded-xl border border-white/10 space-y-1"><p className="text-xs">📅 {w.date}</p><p className="text-xs">👨‍💻 {w.instructor}</p></div>
    {w.prereqs.length > 0 && <div><p className="text-xs font-semibold">Pré-requisitos:</p>{w.prereqs.map((p: string, i: number) => <p key={i} className="text-[10px] text-muted-foreground">✓ {p}</p>)}</div>}
    <Button onClick={() => toast.success("Inscrição registada!")} className="w-full">Inscrever-me</Button>
  </div>)
}
