"use client"
import { ArrowLeft, Package, FileDigit, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CriarProdutoHub() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja/produtos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Produto</h1></div>
      <p className="text-xs text-muted-foreground">Que tipo de produto?</p>
      {[{h:"/dashboard/monetizacao/loja/produtos/criar/fisico",icon:"👕",title:"Físico",desc:"Merch, acessórios, roupas"},{h:"/dashboard/monetizacao/loja/produtos/criar/digital",icon:"💾",title:"Digital",desc:"Overlays, sons, templates, PDFs"},{h:"/dashboard/monetizacao/loja/produtos/criar/experiencia",icon:"🎤",title:"Experiência",desc:"Shoutout, gaming, dueto ao vivo"}].map(t => <Link key={t.h} href={t.h}><div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-2xl">{t.icon}</span><div><p className="text-sm font-bold">{t.title}</p><p className="text-[9px] text-muted-foreground">{t.desc}</p></div></div></Link>)}
    </div>
  )
}
