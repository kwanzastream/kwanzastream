"use client"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CarrinhoPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto" />
      <h2 className="text-lg font-bold">Compra directa disponível</h2>
      <p className="text-xs text-muted-foreground">Nesta fase, cada compra é feita individualmente na página do produto. Carrinho multi-produto disponível em breve.</p>
      <Link href="/loja/explorar"><Button className="gap-1"><ArrowRight className="w-4 h-4" />Explorar produtos</Button></Link>
    </div>
  )
}
