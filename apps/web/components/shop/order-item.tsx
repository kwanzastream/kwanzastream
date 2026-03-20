"use client"
import { ProductTypeBadge } from "./product-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface OrderData {
  id: string
  productName: string
  channel: string
  price: number
  type: "physical" | "digital" | "experience"
  date: string
  status: "paid" | "preparing" | "shipped" | "delivered" | "cancelled" | "refunded"
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  paid: { label: "Pago", color: "bg-blue-500/10 text-blue-400" },
  preparing: { label: "Em preparação", color: "bg-yellow-500/10 text-yellow-400" },
  shipped: { label: "Enviado", color: "bg-purple-500/10 text-purple-400" },
  delivered: { label: "Entregue", color: "bg-green-500/10 text-green-400" },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-400" },
  refunded: { label: "Reembolsado", color: "bg-gray-500/10 text-gray-400" },
}

export function OrderItem({ order }: { order: OrderData }) {
  const st = STATUS_MAP[order.status]
  return (
    <Link href={`/loja/pedidos/${order.id}`} className="block">
      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-lg">📦</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">{order.productName}</p>
          <p className="text-[9px] text-muted-foreground">@{order.channel} · {order.date}</p>
          <ProductTypeBadge type={order.type} />
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold">{order.price.toLocaleString()} Kz</p>
          <Badge className={`text-[7px] ${st.color}`}>{st.label}</Badge>
        </div>
      </div>
    </Link>
  )
}
