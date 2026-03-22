"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, Rocket, CheckCircle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ProducaoPage() {
  const { id } = useParams()
  const reqs = [
    { label: "Privacy Policy URL configurado", done: false },
    { label: "Terms of Service URL configurado", done: false },
    { label: "Pelo menos 1 utilizador de teste (diferente de ti)", done: false },
    { label: "Webhook de teste bem-sucedido", done: false },
  ]
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />App</Link>
      <Rocket className="w-8 h-8 text-primary" />
      <h1 className="text-xl font-bold">Promover para Produção</h1>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs text-muted-foreground">A tua app está em modo <span className="text-yellow-400 font-semibold">Sandbox</span>.</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="p-2 rounded-lg bg-white/5 text-center"><p className="text-[10px] text-muted-foreground">Sandbox</p><p className="text-xs">100 req/min</p></div>
          <div className="p-2 rounded-lg bg-primary/5 text-center"><p className="text-[10px] text-primary">Produção</p><p className="text-xs">1.000 req/min</p></div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold">Requisitos:</p>
        {reqs.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            {r.done ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Circle className="w-4 h-4" />}{r.label}
          </div>
        ))}
      </div>
      <Button disabled className="w-full">Submeter para revisão</Button>
      <p className="text-[10px] text-muted-foreground text-center">Completa todos os requisitos para submeter.</p>
    </div>
  )
}
