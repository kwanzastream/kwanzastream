"use client"
import { useState } from "react"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function LinksPage() {
  const [mode, setMode] = useState("block")
  const [domains, setDomains] = useState(["kwanzastream.ao","youtube.com"])
  const [newD, setNewD] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Links</h1></div>
      {[{id:"allow",l:"Permitir todos"},{id:"block",l:"Bloquear todos ← padrão"},{id:"whitelist",l:"Só whitelist"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="links" checked={mode === o.id} onChange={() => setMode(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      {mode === "whitelist" && <><p className="text-[10px] font-bold">Whitelist</p><div className="flex gap-2"><Input value={newD} onChange={e => setNewD(e.target.value)} placeholder="dominio.com" className="bg-white/5" /><Button size="sm" onClick={() => { if(newD) { setDomains([...domains, newD]); setNewD("") }}}><Plus className="w-3 h-3" /></Button></div>{domains.map(d => <div key={d} className="flex items-center justify-between p-2 rounded border border-white/10"><span className="text-xs font-mono">{d}</span><Button size="sm" variant="ghost" className="text-red-400 h-6" onClick={() => setDomains(domains.filter(x => x !== d))}><X className="w-3 h-3" /></Button></div>)}</>}
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Links de WhatsApp: Permitir</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Links guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
