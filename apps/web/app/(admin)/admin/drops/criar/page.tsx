"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function DropsCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Drop</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Nome", ph: "Drop Especial" }, { l: "Jogo/Categoria", ph: "Gaming" }, { l: "Data início", ph: "2026-04-01" }, { l: "Data fim", ph: "2026-04-07" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
    <Button onClick={() => toast.success("Drop criado!")} className="text-xs">Criar drop</Button></div></div>) }
