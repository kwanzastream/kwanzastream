"use client"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
export default function VersaoPage() {
  const { id, v } = useParams()
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/extensoes/${id}/versoes`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Versões</Link>
      <h1 className="text-xl font-bold">Versão {String(v)}</h1>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <div className="flex justify-between text-xs"><span className="text-muted-foreground">Estado</span><span>Draft</span></div>
        <div className="flex justify-between text-xs"><span className="text-muted-foreground">Tamanho</span><span>45 KB</span></div>
        <div className="flex justify-between text-xs"><span className="text-muted-foreground">Data</span><span>20 Mar 2026</span></div>
      </div>
    </div>
  )
}
