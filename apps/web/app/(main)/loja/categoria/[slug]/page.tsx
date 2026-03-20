"use client"
import { useParams } from "next/navigation"
import { ProductCard, type ProductData } from "@/components/shop/product-card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: ProductData[] = [
  { id: "c1", name: "Produto de Categoria", price: 2500, channel: "canal_ao", type: "digital", rating: 4.5, reviews: 15 },
  { id: "c2", name: "Outro Produto", price: 1200, channel: "criador_ao", type: "digital", rating: 4.8, reviews: 8 },
]

export default function CategoriaPage() {
  const { slug } = useParams()
  const name = typeof slug === "string" ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Categoria"
  return (
    <div className="max-w-5xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/loja/explorar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">{name}</h1></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{MOCK.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  )
}
