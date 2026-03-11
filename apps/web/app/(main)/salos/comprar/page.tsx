"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Zap, Loader2, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

const SALO_PACKS = [
  { salos: 50, kz: 50, popular: false }, { salos: 200, kz: 200, popular: false }, { salos: 500, kz: 500, popular: true },
  { salos: 1000, kz: 1000, popular: false }, { salos: 2500, kz: 2500, popular: true }, { salos: 5000, kz: 5000, popular: false },
  { salos: 10000, kz: 10000, popular: false },
]

export default function ComprarSalosPage() {
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const [selected, setSelected] = useState<typeof SALO_PACKS[0] | null>(null)
  const [loading, setLoading] = useState(false)
  const balance = (user as any)?.balance ?? 0

  const handlePurchase = async () => {
    if (!selected) return
    if (selected.kz * 100 > balance) { toast.error("Saldo insuficiente. Deposita primeiro."); return }
    setLoading(true)
    try {
      await api.post("/api/wallet/deposit", { amount: selected.kz * 100, method: "SALO_PURCHASE", saloAmount: selected.salos })
      await refreshUser()
      toast.success(`Compraste ${selected.salos.toLocaleString("pt-AO")} Salos! ⚡`)
      router.push("/wallet")
    } catch {
      toast.info("Para comprar Salos, deposita o valor equivalente na tua carteira e usa durante os streams.")
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button><div><h1 className="text-xl font-bold">Comprar Salos</h1><p className="text-xs text-muted-foreground">1 Salo = 1 Kz</p></div></div>
      <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50"><p className="text-sm text-muted-foreground">Saldo disponível</p><p className="font-bold">{(balance / 100).toLocaleString("pt-AO", { minimumFractionDigits: 2 })} Kz</p></div>
      <div className="grid grid-cols-2 gap-3">
        {SALO_PACKS.map((pack) => (
          <button key={pack.salos} onClick={() => setSelected(pack)} className={`relative p-4 rounded-xl border text-left transition-all ${selected?.salos === pack.salos ? "border-[#F9D616] bg-[#F9D616]/10" : "border-border/50 hover:border-muted-foreground"}`}>
            {pack.popular && <Badge className="absolute -top-2 left-3 text-[10px] bg-[#F9D616] text-black h-4 px-1.5">Popular</Badge>}
            <div className="flex items-center gap-1.5 mb-1"><Zap className="w-4 h-4 text-[#F9D616]" /><span className="font-bold text-lg">{pack.salos.toLocaleString("pt-AO")}</span></div>
            <p className="text-xs text-muted-foreground">Salos</p>
            <p className="text-sm font-semibold mt-2">{pack.kz.toLocaleString("pt-AO")} Kz</p>
          </button>
        ))}
      </div>
      {selected && (
        <Card className="border-[#F9D616]/30"><CardContent className="pt-4 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Pacote</span><span className="font-medium">{selected.salos.toLocaleString("pt-AO")} Salos</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-bold">{selected.kz.toLocaleString("pt-AO")} Kz</span></div>
          {selected.kz * 100 > balance && <div className="flex items-center gap-2 text-xs text-yellow-500"><AlertCircle className="w-3.5 h-3.5 shrink-0" />Saldo insuficiente. <Link href="/wallet/depositar" className="underline">Depositar</Link></div>}
          <Button className="w-full bg-[#F9D616] text-black hover:bg-[#F9D616]/90" onClick={handlePurchase} disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4 mr-1.5" />Comprar {selected.salos.toLocaleString("pt-AO")} Salos</>}</Button>
        </CardContent></Card>
      )}
      <p className="text-xs text-center text-muted-foreground">Os Salos são usados para apoiar criadores durante os streams. 80% vai directamente para o criador.</p>
    </div>
  )
}
