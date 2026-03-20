"use client"
import { ProductCard, type ProductData } from "@/components/shop/product-card"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SAVED: ProductData[] = [
  { id: "fav1", name: "Hoodie Kuduro King", price: 8500, channel: "kuduro_master", type: "physical", rating: 4.8 },
  { id: "fav2", name: "Soundboard Pack", price: 800, channel: "comedy_ao", type: "digital", rating: 4.7 },
]

export default function FavoritosPage() {
  return (
    <div className="max-w-5xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Heart className="w-5 h-5 text-red-400" />Produtos Guardados</h1></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{SAVED.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  )
}
