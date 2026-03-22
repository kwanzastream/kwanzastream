"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
export default function VersoesPage() {
  const { id } = useParams()
  const versions = [{ v: "0.1.0", date: "20 Mar 2026", status: "draft" }, { v: "0.0.1", date: "15 Mar 2026", status: "rejected" }]
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/extensoes/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Extensão</Link>
      <h1 className="text-xl font-bold">Versões</h1>
      <div className="space-y-2">{versions.map(v => (
        <Link key={v.v} href={`/developers/console/extensoes/${id}/versoes/${v.v}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
          <Tag className="w-4 h-4 text-primary" /><div className="flex-1"><p className="text-sm font-mono">{v.v}</p><p className="text-[10px] text-muted-foreground">{v.date}</p></div>
          <Badge className={v.status === "draft" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}>{v.status}</Badge>
        </Link>
      ))}</div>
    </div>
  )
}
