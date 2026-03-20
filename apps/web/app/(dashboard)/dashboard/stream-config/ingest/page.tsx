"use client"
import { useState } from "react"
import { Save, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function IngestPage() {
  const [server, setServer] = useState("luanda")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🌐 Servidor de Ingest</h1>
      {[{id:"luanda",l:"Luanda, Angola",latency:"12ms",rec:true},{id:"lisboa",l:"Lisboa, Portugal",latency:"85ms"},{id:"frankfurt",l:"Frankfurt, Alemanha",latency:"110ms"},{id:"saopaulo",l:"São Paulo, Brasil",latency:"180ms"}].map(s => <button key={s.id} onClick={() => setServer(s.id)} className={`w-full p-3 rounded-xl border text-left ${server === s.id ? "border-primary bg-primary/5" : "border-white/10"}`}><div className="flex justify-between"><p className="text-xs font-bold">{s.l}{s.rec ? " ← recomendado" : ""}</p><span className="text-[9px] text-muted-foreground">{s.latency}</span></div></button>)}
      <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => toast.info("A testar latência...")}><Wifi className="w-3 h-3" />Testar todos os servidores</Button>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Servidor guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
