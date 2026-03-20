"use client"
import { ShoppingBag, Download, Sparkles } from "lucide-react"
import Link from "next/link"

export interface ProductData {
  id: string
  name: string
  price: number
  channel: string
  type: "physical" | "digital" | "experience"
  image?: string
  rating?: number
  reviews?: number
}

const TYPE_CONFIG = {
  physical: { label: "Físico", icon: ShoppingBag, color: "bg-blue-500/10 text-blue-400" },
  digital: { label: "Digital", icon: Download, color: "bg-green-500/10 text-green-400" },
  experience: { label: "Experiência", icon: Sparkles, color: "bg-purple-500/10 text-purple-400" },
}

export function ProductTypeBadge({ type }: { type: "physical" | "digital" | "experience" }) {
  const cfg = TYPE_CONFIG[type]
  return <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${cfg.color}`}><cfg.icon className="w-3 h-3" />{cfg.label}</span>
}

export function ProductCard({ product }: { product: ProductData }) {
  return (
    <Link href={`/loja/produto/${product.id}`} className="block group">
      <div className="rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all">
        <div className="aspect-square bg-white/5 flex items-center justify-center"><ShoppingBag className="w-10 h-10 text-muted-foreground/20 group-hover:scale-110 transition-transform" /></div>
        <div className="p-3 space-y-1">
          <ProductTypeBadge type={product.type} />
          <p className="text-sm font-bold truncate">{product.name}</p>
          <p className="text-[9px] text-muted-foreground">@{product.channel}{product.rating && ` · ⭐ ${product.rating}`}{product.reviews && ` (${product.reviews})`}</p>
          <p className="text-sm font-bold text-primary">{product.price.toLocaleString()} Kz</p>
        </div>
      </div>
    </Link>
  )
}
