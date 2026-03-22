"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function CampanhaCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Campanha</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Nome", ph: "Campanha Maio 2026" }, { l: "Marca", ph: "Unitel" }, { l: "Orçamento (Kz)", ph: "500000" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
    <Button onClick={() => toast.success("Campanha criada!")} className="text-xs">Criar</Button></div></div>) }
