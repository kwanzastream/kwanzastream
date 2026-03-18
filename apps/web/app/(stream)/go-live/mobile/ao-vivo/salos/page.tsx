"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

const MOCK_SALOS = [
  { id: "s1", from: "Pedro Luanda", amount: 500, message: "Grande stream! 🔥", ts: "agora" },
  { id: "s2", from: "Maria Benguela", amount: 1500, message: "Continua assim mano!", ts: "2 min" },
  { id: "s3", from: "VIP Fan", amount: 5000, message: "", ts: "5 min" },
]

export default function GoLiveMobileSalosPage() {
  const router = useRouter()
  const total = MOCK_SALOS.reduce((s, d) => s + d.amount, 0)

  return (
    <div className="h-screen flex flex-col bg-black/95">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F9D616]" />
          <h3 className="text-sm font-bold">Salos recebidos</h3>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => router.back()}><X className="w-4 h-4" /></Button>
      </div>

      {/* Session total */}
      <div className="p-4 border-b border-white/10 text-center">
        <p className="text-3xl font-black text-[#F9D616]">{total.toLocaleString("pt-AO")} Kz</p>
        <p className="text-xs text-muted-foreground mt-1">Total desta sessão</p>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {MOCK_SALOS.map((s) => (
          <div key={s.id} className={`rounded-xl border p-3 ${s.amount >= 1000 ? "border-[#F9D616]/30 bg-[#F9D616]/5" : "border-white/10"}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">{s.from}</span>
              <Badge className="bg-[#F9D616]/20 text-[#F9D616] border-none text-[10px] gap-0.5">
                <Zap className="w-2.5 h-2.5" /> {s.amount.toLocaleString("pt-AO")} Kz
              </Badge>
            </div>
            {s.message && <p className="text-xs text-muted-foreground mt-1">{s.message}</p>}
            <p className="text-[9px] text-muted-foreground mt-1">{s.ts}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
