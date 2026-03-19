"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TriboRegrasPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}/sobre`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><FileText className="w-5 h-5" />Regras da Tribo</h1></div>
      <div className="prose prose-invert prose-sm max-w-none space-y-3">
        <ol><li>Respeito por todos os membros</li><li>Conteúdo relacionado com Kuduro (música, dança, cultura)</li><li>Sem spam ou autopromoção excessiva</li><li>Seguir as <Link href="/diretrizes-comunidade" className="text-primary">Diretrizes da Comunidade Kwanza Stream</Link></li></ol>
      </div>
    </div>
  )
}
