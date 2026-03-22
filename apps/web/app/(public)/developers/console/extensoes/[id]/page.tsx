"use client"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
export default function ExtensaoDetailPage() {
  const { id } = useParams()
  const links = ["versoes", "testes", "submeter", "analytics"]
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/console/extensoes" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Extensões</Link>
      <div className="flex items-start justify-between"><h1 className="text-xl font-bold">Extensão #{String(id).slice(0, 8)}</h1><Badge className="bg-yellow-500/10 text-yellow-400">Draft</Badge></div>
      <div className="space-y-2">
        {links.map(l => (
          <Link key={l} href={`/developers/console/extensoes/${id}/${l}`} className="block p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm capitalize">{l}</Link>
        ))}
      </div>
    </div>
  )
}
