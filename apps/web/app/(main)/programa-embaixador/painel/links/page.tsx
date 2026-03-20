"use client"
import { ArrowLeft, Link2, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const LINKS = [
  { label: "Link geral", url: "https://kwanzastream.com/?ref=embaixador_01", clicks: 234 },
  { label: "Campanha Março", url: "https://kwanzastream.com/?ref=emb_mar26", clicks: 89 },
]
export default function LinksPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-embaixador/painel"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Link2 className="w-5 h-5" />Links de Referral</h1></div>
      <div className="space-y-2">{LINKS.map(l => <div key={l.label} className="p-3 rounded-xl border border-white/10 space-y-2"><div className="flex items-center justify-between"><p className="text-xs font-bold">{l.label}</p><span className="text-[9px] text-muted-foreground">{l.clicks} cliques</span></div><div className="flex gap-2"><input value={l.url} readOnly className="flex-1 h-8 rounded-md bg-white/5 border border-white/10 px-2 text-[9px] font-mono" /><Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(l.url); toast.success("Copiado!") }}><Copy className="w-3 h-3" /></Button></div></div>)}</div>
    </div>
  )
}
