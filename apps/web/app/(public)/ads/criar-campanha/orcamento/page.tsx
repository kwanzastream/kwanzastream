"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ArrowRight } from "lucide-react"

export default function OrcamentoPage() {
  const [budget, setBudget] = useState(10000)
  const [model, setModel] = useState("cpm")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const router = useRouter()

  const impressions = model === "cpm" ? Math.round(budget / 0.25) : Math.round(budget / 50) * 20
  const clicks = model === "cpm" ? Math.round(impressions * 0.023) : Math.round(budget / 50)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={4} />
      <Link href="/ads/criar-campanha/criativo" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Criativo</Link>
      <h1 className="text-xl font-bold">Orçamento</h1>

      <div>
        <label className="text-xs text-muted-foreground">Orçamento total (Kz)</label>
        <input type="number" value={budget} onChange={e => setBudget(Math.max(10000, Number(e.target.value)))} min={10000}
          className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
        <p className="text-[10px] text-muted-foreground mt-1">Mínimo: 10.000 Kz</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Modelo de preço:</p>
        {[{ id: "cpm", label: "CPM (por 1.000 impressões)", price: "~250 Kz/CPM" },
          { id: "cpc", label: "CPC (por clique)", price: "~50 Kz/clique" }].map(m => (
          <button key={m.id} onClick={() => setModel(m.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border text-left ${model === m.id ? "border-primary bg-primary/5" : "border-white/10"}`}>
            <span className="text-xs">{m.label}</span><span className="text-[10px] text-muted-foreground">{m.price}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground">Data início</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Data fim</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
        <p className="text-xs font-semibold">Estimativa</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div><p className="text-sm font-bold">{(impressions / 1000).toFixed(0)}k</p><p className="text-[9px] text-muted-foreground">Impressões</p></div>
          <div><p className="text-sm font-bold">{clicks.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">Cliques</p></div>
          <div><p className="text-sm font-bold">{Math.round(impressions * 0.35 / 1000)}k</p><p className="text-[9px] text-muted-foreground">Alcance único</p></div>
        </div>
      </div>

      <Button onClick={() => { sessionStorage.setItem("ads_budget", String(budget)); router.push("/ads/criar-campanha/revisao") }} className="w-full gap-1.5">
        Seguinte <ArrowRight className="w-3 h-3" />
      </Button>
    </div>
  )
}
