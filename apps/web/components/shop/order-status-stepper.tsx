"use client"
import { Check, Circle, Truck, Package, Clock } from "lucide-react"

const STEPS = [
  { id: "paid", label: "Pago", icon: Check },
  { id: "preparing", label: "Em preparação", icon: Package },
  { id: "shipped", label: "Enviado", icon: Truck },
  { id: "delivered", label: "Entregue", icon: Check },
]

export function OrderStatusStepper({ current }: { current: string }) {
  const idx = STEPS.findIndex(s => s.id === current)
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-1 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${i <= idx ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground"}`}>
            {i < idx ? <Check className="w-3 h-3" /> : i === idx ? <s.icon className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
          </div>
          <p className={`text-[8px] ${i <= idx ? "text-primary font-bold" : "text-muted-foreground"}`}>{s.label}</p>
          {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < idx ? "bg-primary" : "bg-white/10"}`} />}
        </div>
      ))}
    </div>
  )
}
