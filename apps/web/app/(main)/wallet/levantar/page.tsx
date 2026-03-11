"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LevantarPage() {
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [iban, setIban] = useState("")
  const [loading, setLoading] = useState(false)
  const balance = (user as any)?.balance ?? 0

  if (((user as any)?.kycTier ?? 0) === 0) {
    return <div className="max-w-md mx-auto text-center py-16"><p className="text-3xl mb-4">🔒</p><h2 className="font-bold text-lg mb-2">KYC necessário</h2><p className="text-sm text-muted-foreground mb-6">Verifica a tua identidade para levantar fundos.</p><Link href="/kyc"><Button>Verificar identidade</Button></Link></div>
  }

  const handleWithdraw = async () => {
    const amountKz = parseFloat(amount)
    if (!amountKz || amountKz < 1000) { toast.error("Mínimo de levantamento: 1.000 Kz"); return }
    if (amountKz * 100 > balance) { toast.error("Saldo insuficiente"); return }
    if (!iban.trim()) { toast.error("Introduz os dados bancários"); return }
    setLoading(true)
    try {
      await api.post("/api/wallet/withdraw", { amount: Math.round(amountKz * 100), method: "BANK_TRANSFER", bankDetails: { iban } })
      await refreshUser()
      toast.success("Pedido de levantamento submetido! Processado em 1-3 dias úteis.")
      router.push("/wallet")
    } catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao processar levantamento") }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => router.push("/wallet")}><ArrowLeft className="w-4 h-4" /></Button><h1 className="text-xl font-bold">Levantar</h1></div>
      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-base">Transferência bancária</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between"><p className="text-xs text-muted-foreground">Saldo disponível</p><p className="font-bold">{(balance / 100).toLocaleString("pt-AO", { minimumFractionDigits: 2 })} Kz</p></div>
          <div className="space-y-1.5"><Label>Valor a levantar (Kz)</Label><Input type="number" placeholder="Mínimo 1.000 Kz" value={amount} onChange={(e) => setAmount(e.target.value)} min={1000} /><p className="text-xs text-muted-foreground">Mínimo: 1.000 Kz · Taxa: 0%</p></div>
          <div className="space-y-1.5"><Label>NIB / IBAN</Label><Input placeholder="AO06 0000 0000 0000 0000 000" value={iban} onChange={(e) => setIban(e.target.value)} className="font-mono" /></div>
          <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3"><AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><p className="text-xs text-yellow-600 dark:text-yellow-400">Os levantamentos são processados em 1 a 3 dias úteis. Certifica-te que o NIB está correcto.</p></div>
          <Button className="w-full" onClick={handleWithdraw} disabled={loading || !amount || !iban}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Levantar ${amount ? `${parseFloat(amount).toLocaleString("pt-AO")} Kz` : ""}`}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
