"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ContactoPublicidadePage() { return (
  <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">📢 Publicidade</h1>
    <p className="text-xs text-muted-foreground">Anuncia no Kwanza Stream e alcança a audiência angolana. Email: ads@kwanzastream.ao</p>
    <div className="space-y-3">{[{ l: "Marca", ph: "Nome da marca" }, { l: "Email", ph: "Email" }, { l: "Orçamento estimado", ph: "Ex: 500.000 Kz" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
      <div><label className="text-[10px] text-muted-foreground">Objectivos</label><textarea placeholder="Objectivos da campanha..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[80px]" /></div>
      <Button onClick={() => toast.success("Pedido enviado!")} className="w-full text-xs">Enviar pedido</Button>
    </div>
  </div>
) }
