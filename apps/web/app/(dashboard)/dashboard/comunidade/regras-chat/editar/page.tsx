"use client"
import { useState } from "react"
import { ArrowLeft, Save, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function EditarRegrasPage() {
  const [rules, setRules] = useState(["Respeita todos os viewers","Sem spam ou flood","Sem linguagem ofensiva","Fala português (PT-AO)","Sem links sem autorização"])
  const move = (i:number,d:number) => { const n=[...rules]; const t=n[i]; n[i]=n[i+d]; n[i+d]=t; setRules(n) }
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/regras-chat"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Regras</h1></div>
      <div className="space-y-1">{rules.map((r,i) => <div key={i} className="flex items-center gap-1 p-1.5 rounded-xl border border-white/10"><span className="text-[9px] font-bold text-primary w-4">{i+1}</span><Input value={r} onChange={e => { const n=[...rules]; n[i]=e.target.value.slice(0,200); setRules(n) }} className="bg-white/5 h-7 text-xs flex-1" /><Button size="icon" variant="ghost" disabled={i===0} onClick={() => move(i,-1)} className="w-6 h-6"><ChevronUp className="w-3 h-3" /></Button><Button size="icon" variant="ghost" disabled={i===rules.length-1} onClick={() => move(i,1)} className="w-6 h-6"><ChevronDown className="w-3 h-3" /></Button><Button size="icon" variant="ghost" onClick={() => setRules(rules.filter((_,j) => j!==i))} className="w-6 h-6"><Trash2 className="w-3 h-3 text-red-400" /></Button></div>)}</div>
      {rules.length < 10 && <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => setRules([...rules,""])}><Plus className="w-3 h-3" />Adicionar regra ({rules.length}/10)</Button>}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Regras guardadas!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
