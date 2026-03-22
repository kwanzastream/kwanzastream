"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function TorneioCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Torneio</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Nome", ph: "Torneio de Gaming" }, { l: "Jogo", ph: "FIFA" }, { l: "Data", ph: "2026-04-15" }, { l: "Prémio (Kz)", ph: "50000" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
    <Button onClick={() => toast.success("Torneio criado!")} className="text-xs">Criar torneio</Button></div></div>) }
