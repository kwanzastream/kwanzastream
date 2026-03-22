"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"
import { ChevronLeft, Loader2, Send } from "lucide-react"

export default function RevisaoPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [summary, setSummary] = useState({ objective: "awareness", budget: "10.000", cta: "Saber mais" })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSummary({
        objective: sessionStorage.getItem("ads_objective") || "awareness",
        budget: Number(sessionStorage.getItem("ads_budget") || 10000).toLocaleString(),
        cta: sessionStorage.getItem("ads_cta") || "Saber mais",
      })
    }
  }, [])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const obj = typeof window !== "undefined" ? sessionStorage.getItem("ads_objective") || "awareness" : "awareness"
      const budget = typeof window !== "undefined" ? Number(sessionStorage.getItem("ads_budget")) || 10000 : 10000

      await api.post("/api/ads/campaigns", {
        name: `Campanha ${obj} — ${new Date().toLocaleDateString("pt-AO")}`,
        objective: obj, budget,
        startDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 10).toISOString(),
      })
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("ads_objective")
        sessionStorage.removeItem("ads_budget")
        sessionStorage.removeItem("ads_cta")
      }
      router.push("/ads/criar-campanha/confirmacao")
    } catch {
      toast.error("Erro ao submeter. Inicia sessão primeiro.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={5} />
      <Link href="/ads/criar-campanha/orcamento" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Orçamento</Link>
      <h1 className="text-xl font-bold">Revisão da campanha</h1>

      <div className="space-y-3">
        {[
          { label: "Objectivo", value: summary.objective },
          { label: "Orçamento", value: `${summary.budget} Kz` },
          { label: "CTA", value: summary.cta },
          { label: "Período", value: "3–10 dias a partir de hoje" },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-xs text-muted-foreground">{r.label}</span>
            <span className="text-sm font-medium">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">
        ⚠️ Após submissão, a campanha fica em estado "Em revisão". A nossa equipa revê o criativo em 24-48h.
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-0.5" />
        <span className="text-xs text-muted-foreground">Li e aceito as <Link href="/ads/politicas" className="text-primary hover:underline">Políticas de Publicidade</Link></span>
      </label>

      <Button onClick={handleSubmit} disabled={!accepted || submitting} className="w-full gap-1.5">
        {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        <Send className="w-3.5 h-3.5" /> Submeter campanha
      </Button>
    </div>
  )
}
