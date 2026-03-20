"use client"
import { useParams } from "next/navigation"
import { ProductTypeBadge } from "@/components/shop/product-card"
import { ReviewCard, type ReviewData } from "@/components/shop/review-card"
import { ArrowLeft, Star, Heart, ShoppingBag, Download, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const REVIEWS: ReviewData[] = [
  { id: "r1", username: "fan_ao", rating: 5, text: "Excelente qualidade! Entrega rápida.", date: "há 3 dias" },
  { id: "r2", username: "viewer_01", rating: 4, text: "Muito bom, recomendo.", date: "há 1 semana" },
  { id: "r3", username: "stream_lover", rating: 5, text: "Perfeito para o meu stream!", date: "há 2 semanas" },
]

export default function ProductPage() {
  const { id } = useParams()
  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Produto</h1></div>
      <div className="aspect-video rounded-2xl bg-white/5 flex items-center justify-center"><ShoppingBag className="w-16 h-16 text-muted-foreground/20" /></div>
      <div className="flex items-start justify-between">
        <div className="space-y-1"><ProductTypeBadge type="digital" /><h2 className="text-xl font-bold">Overlay Pack OBS Premium</h2><p className="text-xs text-muted-foreground">@esports_ao</p><div className="flex items-center gap-1 text-xs"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /><span className="font-bold">4.9</span><span className="text-muted-foreground">(45 reviews)</span></div></div>
        <div className="text-right"><p className="text-2xl font-black text-primary">2.500 Kz</p></div>
      </div>
      <div className="flex gap-3"><Link href={`/loja/produto/${id}/comprar`} className="flex-1"><Button className="w-full h-12 gap-1 font-bold"><ShoppingBag className="w-4 h-4" />Comprar</Button></Link><Button variant="outline" size="icon" className="h-12 w-12"><Heart className="w-4 h-4" /></Button></div>
      <div className="p-4 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-1"><p className="flex items-center gap-1"><Download className="w-3 h-3 text-green-400" />Tipo: Digital — Entrega imediata</p><p className="flex items-center gap-1"><Clock className="w-3 h-3" />Link válido por 7 dias, re-download disponível</p></div>
      <div className="space-y-2"><p className="text-sm font-bold">Descrição</p><p className="text-xs text-muted-foreground">Pack completo de overlays para OBS Studio. Inclui 15 cenas, alertas animados, stinger transitions e barra de chat. Compatível com OBS, Streamlabs e XSplit. Formato: PNG, WebM, HTML.</p></div>
      <div className="space-y-2"><div className="flex items-center justify-between"><p className="text-sm font-bold">Reviews</p><Link href="#" className="text-[10px] text-primary hover:underline">Ver todas →</Link></div>{REVIEWS.map(r => <ReviewCard key={r.id} review={r} />)}</div>
    </div>
  )
}
