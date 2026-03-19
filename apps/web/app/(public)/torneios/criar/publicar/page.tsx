"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Trophy } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function TorneioCriarPublicarPage() {
  const router = useRouter()
  const [publishing, setPublishing] = useState(false)

  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => { toast.success("Torneio criado! Pendente aprovação."); router.push("/torneios/proximos") }, 2000)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/torneios/criar/streams"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">7/7 — Publicar</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center space-y-3">
        <Trophy className="w-10 h-10 text-primary mx-auto" />
        <h2 className="text-lg font-bold">Revisão final</h2>
        <p className="text-xs text-muted-foreground">Verifica todos os dados antes de publicar. Após criação, o torneio fica pendente até aprovação de admin.</p>
      </div>
      <div className="space-y-2 text-xs text-muted-foreground">
        <p>✅ Formato definido</p><p>✅ Detalhes preenchidos</p><p>✅ Regulamento escrito</p>
        <p>✅ Prémios configurados</p><p>✅ Inscrições configuradas</p><p>✅ Streams associados</p>
      </div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={handlePublish} disabled={publishing}>
        {publishing ? <><Loader2 className="w-4 h-4 animate-spin" />A criar torneio...</> : <><Check className="w-4 h-4" />Publicar Torneio</>}
      </Button>
    </div>
  )
}
