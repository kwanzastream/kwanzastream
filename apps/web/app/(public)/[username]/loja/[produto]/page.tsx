"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react"

export default function ProdutoDetailPage() {
  const { username, produto } = useParams()
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild><Link href={`/${username}/loja`}><ArrowLeft className="w-4 h-4" /></Link></Button>
        <h2 className="font-semibold text-lg">Produto</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center"><ShoppingBag className="w-16 h-16 text-muted-foreground" /></div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Produto #{produto}</h3>
          <p className="text-muted-foreground">Descrição do produto carregada da API.</p>
          <p className="text-2xl font-bold text-primary">0 Kz</p>
          <Button className="w-full gap-2"><ShoppingCart className="w-4 h-4" />Comprar</Button>
          <p className="text-[11px] text-center text-muted-foreground">Multicaixa Express · e-Kwanza · Unitel Money</p>
        </div>
      </div>
    </div>
  )
}
