"use client"
import { useState } from "react"
import { ProductCard, type ProductData } from "@/components/shop/product-card"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TYPES = ["Todos","Físico","Digital","Experiência"]
const CATS = ["Vestuário","Acessórios","Digital","Áudio","Experiência","Arte"]
const ALL: ProductData[] = [
  { id: "p1", name: "Hoodie Kuduro King", price: 8500, channel: "kuduro_master", type: "physical", rating: 4.8, reviews: 23 },
  { id: "p2", name: "Overlay Pack OBS", price: 2500, channel: "esports_ao", type: "digital", rating: 4.9, reviews: 45 },
  { id: "p3", name: "Shoutout ao Vivo", price: 1500, channel: "semba_dj", type: "experience", rating: 5.0, reviews: 12 },
  { id: "p4", name: "T-shirt Gamer AO", price: 3500, channel: "gamer_angola", type: "physical", rating: 4.6, reviews: 38 },
  { id: "p5", name: "Soundboard Pack", price: 800, channel: "comedy_ao", type: "digital", rating: 4.7, reviews: 67 },
  { id: "p6", name: "Wallpaper 4K Angola", price: 500, channel: "arte_ao", type: "digital" },
]

export default function ExplorarPage() {
  const [type, setType] = useState("Todos")
  return (
    <div className="max-w-5xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Explorar Produtos</h1></div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TYPES.map(t => <button key={t} onClick={() => setType(t)} className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold ${type === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t}</button>)}</div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{CATS.map(c => <Link key={c} href={`/loja/categoria/${c.toLowerCase()}`} className="shrink-0 px-3 py-1 rounded-full text-[9px] font-bold text-muted-foreground hover:bg-white/10 border border-white/10">{c}</Link>)}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{ALL.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  )
}
