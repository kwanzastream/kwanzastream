"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { ArrowLeft, Copy, Loader2, Clock } from "lucide-react"
import Link from "next/link"

type Step = "method" | "amount" | "instructions"
type Method = { id: string; label: string; description: string; icon: string; minAmount: number; maxAmount?: number }

const METHODS: Method[] = [
  { id: "MULTICAIXA_EXPRESS", label: "Multicaixa Express", description: "Referência ATM/MB — disponível em 24h", icon: "🏧", minAmount: 500, maxAmount: 500000 },
  { id: "E_KWANZA", label: "E-Kwanza", description: "Carteira digital BNA", icon: "📱", minAmount: 100, maxAmount: 200000 },
  { id: "UNITEL_MONEY", label: "Unitel Money", description: "Transferência via USSD *123#", icon: "📲", minAmount: 100, maxAmount: 100000 },
  { id: "BANK_TRANSFER", label: "Transferência Bancária", description: "TPA / NIB — 1 a 3 dias úteis", icon: "🏦", minAmount: 1000 },
]

export default function DepositarPage() {
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<Step>("method")
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null)
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [depositResult, setDepositResult] = useState<any>(null)

  if (((user as any)?.kycTier ?? 0) === 0) {
    return <div className="max-w-md mx-auto text-center py-16"><p className="text-3xl mb-4">🔒</p><h2 className="font-bold text-lg mb-2">Verificação necessária</h2><p className="text-sm text-muted-foreground mb-6">Para depositar precisas de verificar a tua identidade primeiro.</p><Link href="/kyc"><Button>Verificar identidade</Button></Link></div>
  }

  const handleRequestDeposit = async () => {
    const amountKz = parseFloat(amount)
    if (!amountKz || amountKz < (selectedMethod?.minAmount ?? 100)) { toast.error(`Mínimo: ${selectedMethod?.minAmount?.toLocaleString("pt-AO")} Kz`); return }
    setLoading(true)
    try {
      const res = await api.post("/api/wallet/deposit", { amount: Math.round(amountKz * 100), method: selectedMethod?.id })
      setDepositResult(res.data); setStep("instructions")
    } catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao processar depósito") }
    finally { setLoading(false) }
  }

  const copy = async (text: string) => { await navigator.clipboard.writeText(text); toast.success("Copiado!") }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => { if (step === "amount") setStep("method"); else if (step === "instructions") setStep("amount"); else router.push("/wallet") }}><ArrowLeft className="w-4 h-4" /></Button>
        <h1 className="text-xl font-bold">Depositar</h1>
      </div>

      {step === "method" && (
        <div className="space-y-3"><p className="text-sm text-muted-foreground">Escolhe como queres depositar</p>
          {METHODS.map((m) => (
            <button key={m.id} onClick={() => { setSelectedMethod(m); setStep("amount") }} className="w-full flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all text-left">
              <span className="text-3xl">{m.icon}</span>
              <div className="flex-1"><p className="font-medium">{m.label}</p><p className="text-xs text-muted-foreground mt-0.5">{m.description}</p><p className="text-xs text-muted-foreground mt-1">Mín: {m.minAmount.toLocaleString("pt-AO")} Kz{m.maxAmount && ` · Máx: ${m.maxAmount.toLocaleString("pt-AO")} Kz`}</p></div>
            </button>
          ))}
        </div>
      )}

      {step === "amount" && selectedMethod && (
        <Card className="border-border/50">
          <CardHeader><div className="flex items-center gap-3"><span className="text-2xl">{selectedMethod.icon}</span><div><CardTitle className="text-base">{selectedMethod.label}</CardTitle><CardDescription className="text-xs">{selectedMethod.description}</CardDescription></div></div></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Valor a depositar (Kz)</Label><Input type="number" placeholder={`Mínimo ${selectedMethod.minAmount.toLocaleString("pt-AO")} Kz`} value={amount} onChange={(e) => setAmount(e.target.value)} min={selectedMethod.minAmount} max={selectedMethod.maxAmount} /></div>
            <div className="flex flex-wrap gap-2">{[500, 1000, 2500, 5000, 10000].map((amt) => <button key={amt} onClick={() => setAmount(String(amt))} className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${amount === String(amt) ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-muted-foreground"}`}>{amt.toLocaleString("pt-AO")} Kz</button>)}</div>
            <Button className="w-full" onClick={handleRequestDeposit} disabled={loading || !amount}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Depositar ${amount ? `${parseFloat(amount).toLocaleString("pt-AO")} Kz` : ""}`}</Button>
          </CardContent>
        </Card>
      )}

      {step === "instructions" && depositResult && (
        <div className="space-y-4">
          <div className="text-center p-6"><Clock className="w-12 h-12 text-yellow-500 mx-auto mb-3" /><h2 className="font-bold text-lg">Aguarda pagamento</h2><p className="text-sm text-muted-foreground mt-1">Efectua o pagamento com as instruções abaixo</p></div>
          <Card className="border-border/50"><CardContent className="pt-4 space-y-3">
            {depositResult.reference && <div className="space-y-1"><p className="text-xs text-muted-foreground uppercase tracking-wider">Referência</p><div className="flex items-center gap-2"><p className="text-2xl font-bold font-mono tracking-widest flex-1">{depositResult.reference}</p><Button variant="outline" size="icon" onClick={() => copy(depositResult.reference)}><Copy className="w-4 h-4" /></Button></div></div>}
            {depositResult.amount && <div><p className="text-xs text-muted-foreground">Valor</p><p className="text-lg font-bold">{(Number(depositResult.amount) / 100).toLocaleString("pt-AO", { minimumFractionDigits: 2 })} Kz</p></div>}
            {depositResult.expiresAt && <div><p className="text-xs text-muted-foreground">Válido até</p><p className="text-sm">{new Date(depositResult.expiresAt).toLocaleString("pt-AO")}</p></div>}
            {depositResult.instructions && <div className="pt-2"><p className="text-xs font-medium mb-2">Instruções</p><p className="text-sm text-muted-foreground leading-relaxed">{depositResult.instructions}</p></div>}
          </CardContent></Card>
          <div className="space-y-2">
            <Button className="w-full" variant="outline" onClick={async () => { try { const res = await api.get(`/api/wallet/payment-status/${depositResult.transactionId}`); if (res.data?.status === "COMPLETED") { await refreshUser(); toast.success("Depósito confirmado!"); router.push("/wallet") } else toast.info("Pagamento ainda pendente") } catch { toast.error("Erro ao verificar") } }}>Verificar estado do pagamento</Button>
            <Button className="w-full" variant="ghost" onClick={() => router.push("/wallet")}>Voltar para a carteira</Button>
          </div>
        </div>
      )}
    </div>
  )
}
