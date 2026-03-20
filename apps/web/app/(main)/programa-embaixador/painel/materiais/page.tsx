"use client"
import { ArrowLeft, FolderOpen, Download, Image, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const MATERIALS = [
  { icon: Image, label: "Logo Kwanza Stream", desc: "PNG, SVG, variantes", action: "Download" },
  { icon: FileText, label: "Brand Guidelines", desc: "Cores, tipografia, uso do logo", action: "Download" },
  { icon: Image, label: "Templates Redes Sociais", desc: "Instagram, Twitter, Facebook", action: "Download" },
  { icon: FileText, label: "Media Kit", desc: "Estatísticas da plataforma para parceiros", action: "Download" },
]
export default function MateriaisPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-embaixador/painel"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><FolderOpen className="w-5 h-5" />Materiais</h1></div>
      <div className="space-y-1.5">{MATERIALS.map(m => <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><m.icon className="w-5 h-5 text-primary shrink-0" /><div className="flex-1"><p className="text-xs font-bold">{m.label}</p><p className="text-[8px] text-muted-foreground">{m.desc}</p></div><Button size="sm" variant="outline" className="text-[9px] gap-1"><Download className="w-3 h-3" />{m.action}</Button></div>)}</div>
    </div>
  )
}
