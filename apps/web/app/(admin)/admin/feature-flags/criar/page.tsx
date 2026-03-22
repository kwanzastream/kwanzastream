"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function FeatureFlagCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Feature Flag</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Nome", ph: "NEW_FEATURE" }, { l: "Descrição", ph: "Nova funcionalidade" }, { l: "Rollout %", ph: "0" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
    <Button onClick={() => toast.success("Flag criada!")} className="text-xs">Criar</Button></div></div>) }
