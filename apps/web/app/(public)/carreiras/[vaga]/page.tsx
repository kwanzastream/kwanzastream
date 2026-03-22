"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function VagaPage() {
  const { vaga } = useParams(); const title = (vaga as string).replaceAll("-", " ")
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/carreiras" className="text-[10px] text-muted-foreground hover:text-foreground">← Carreiras</Link>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="text-xs text-muted-foreground space-y-2"><p>📍 Luanda, Angola (remoto possível)</p><p>🕐 Full-time</p><p>💰 Competitivo + equity</p></div>
      <div className="space-y-3"><h2 className="text-sm font-bold">Responsabilidades</h2><ul className="list-disc ml-4 text-xs text-muted-foreground space-y-1"><li>Contribuir para o desenvolvimento da plataforma</li><li>Colaborar com a equipa fundadora</li></ul></div>
      <Link href={`/carreiras/${vaga}/candidatar`}><Button className="w-full text-xs">Candidatar-me</Button></Link>
    </div>
  )
}
