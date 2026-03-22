"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ContactoParceirosPage() { return (
  <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">🤝 Parceiros</h1>
    <p className="text-xs text-muted-foreground">Interessado em parcerias com o Kwanza Stream? Preenche o formulário.</p>
    <div className="space-y-3">{[{ l: "Empresa", ph: "Nome da empresa" }, { l: "Email", ph: "Email corporativo" }, { l: "Website", ph: "https://..." }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
      <div><label className="text-[10px] text-muted-foreground">Proposta</label><textarea placeholder="Descreve a parceria..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[80px]" /></div>
      <Button onClick={() => toast.success("Proposta enviada!")} className="w-full text-xs">Enviar proposta</Button>
    </div>
  </div>
) }
