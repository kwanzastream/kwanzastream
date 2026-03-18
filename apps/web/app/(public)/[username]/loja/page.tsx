"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"
import { ShoppingBag, Tag, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_PRODUTOS = [
  { id: "p1", title: "T-shirt Kwanza Stream", price: 5000, type: "physical", image: null },
  { id: "p2", title: "Overlay Pack Premium", price: 2500, type: "digital", image: null },
  { id: "p3", title: "Shoutout no stream", price: 1500, type: "experience", image: null },
  { id: "p4", title: "Kit de stickers", price: 800, type: "physical", image: null },
]

export default function ChannelLojaPage() {
  const { username } = useParams()
  const [shopEnabled, setShopEnabled] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then((res) => {
      const u = res.data.user
      if (u?.settings?.shopEnabled === false) setShopEnabled(false)
    }).catch(() => {})
  }, [username])

  if (!shopEnabled) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Loja não disponível</p>
        <p className="text-sm text-muted-foreground mt-1">Este canal não tem uma loja activa</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Loja</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_PRODUTOS.map((p) => (
          <Link key={p.id} href={`/${username}/loja/${p.id}`}>
            <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{p.title}</p>
                <p className="text-primary font-bold mt-1">{p.price.toLocaleString("pt-AO")} Kz</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {p.type === "physical" && <Badge variant="secondary" className="text-[8px] px-1"><Truck className="w-2.5 h-2.5 mr-0.5" />Angola</Badge>}
                  {p.type === "digital" && <Badge variant="secondary" className="text-[8px] px-1"><Tag className="w-2.5 h-2.5 mr-0.5" />Digital</Badge>}
                  {p.type === "experience" && <Badge variant="secondary" className="text-[8px] px-1">Experiência</Badge>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
