"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function TestesPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/extensoes/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Extensão</Link>
      <FlaskConical className="w-8 h-8 text-primary" />
      <h1 className="text-xl font-bold">Ambiente de Teste</h1>
      <p className="text-xs text-muted-foreground">Testa a extensão num canal de sandbox antes de publicar.</p>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs"><span className="text-muted-foreground">URL de teste:</span> <code className="text-primary">https://sandbox.kwanzastream.ao/ext/{String(id).slice(0,8)}</code></p>
        <p className="text-xs"><span className="text-muted-foreground">Canal de teste:</span> <code className="text-primary">sandbox_channel</code></p>
      </div>
      <Button className="w-full">Abrir ambiente de teste</Button>
    </div>
  )
}
