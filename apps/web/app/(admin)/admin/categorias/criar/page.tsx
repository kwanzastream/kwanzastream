"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function CategoriasCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Categoria</h1>
  <div className="space-y-3 max-w-lg">{[{ l: "Nome", ph: "Gaming" }, { l: "Slug", ph: "gaming" }, { l: "Descrição", ph: "Jogos e esports" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
    <Button onClick={() => toast.success("Categoria criada!")} className="text-xs">Criar categoria</Button></div></div>) }
