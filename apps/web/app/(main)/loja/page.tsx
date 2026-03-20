"use client"
import { ProductCard, type ProductData } from "@/components/shop/product-card"
import { ShoppingBag, Sparkles, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

const FEATURED: ProductData[] = [
  { id: "p1", name: "Hoodie Kuduro King", price: 8500, channel: "kuduro_master", type: "physical", rating: 4.8, reviews: 23 },
  { id: "p2", name: "Overlay Pack OBS", price: 2500, channel: "esports_ao", type: "digital", rating: 4.9, reviews: 45 },
  { id: "p3", name: "Shoutout ao Vivo", price: 1500, channel: "semba_dj", type: "experience", rating: 5.0, reviews: 12 },
]
const POPULAR: ProductData[] = [
  { id: "p4", name: "T-shirt Gamer AO", price: 3500, channel: "gamer_angola", type: "physical", rating: 4.6, reviews: 38 },
  { id: "p5", name: "Soundboard Pack", price: 800, channel: "comedy_ao", type: "digital", rating: 4.7, reviews: 67 },
]
const NEW: ProductData[] = [
  { id: "p6", name: "Wallpaper 4K Angola", price: 500, channel: "arte_ao", type: "digital" },
  { id: "p7", name: "Gaming Session 1h", price: 5000, channel: "esports_ao", type: "experience" },
]

export default function LojaPage() {
  return (
    <div className="max-w-5xl mx-auto py-4 px-4 space-y-8">
      <h1 className="text-xl font-bold flex items-center gap-2"><ShoppingBag className="w-5 h-5" />Loja</h1>
      <div className="space-y-3"><h2 className="text-sm font-bold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-yellow-400" />Em Destaque</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{FEATURED.map(p => <ProductCard key={p.id} product={p} />)}</div></div>
      <div className="space-y-3"><h2 className="text-sm font-bold flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-green-400" />Populares</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{POPULAR.map(p => <ProductCard key={p.id} product={p} />)}</div></div>
      <div className="space-y-3"><h2 className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />Novidades</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{NEW.map(p => <ProductCard key={p.id} product={p} />)}</div></div>
      <Link href="/loja/explorar" className="block text-center text-xs text-primary hover:underline">Ver todos os produtos →</Link>
    </div>
  )
}
