"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function InscreverEscolaPage() { return (<div className="max-w-lg mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Inscrever a tua Escola</h1>
  <p className="text-xs text-muted-foreground">Preenche o formulário e a equipa contacta-te em 5 dias úteis.</p>
  <div className="space-y-3">
    {[{ label: "Nome da escola", ph: "Escola Secundária..." }, { label: "Município", ph: "Ingombota, Luanda" }, { label: "Email do professor", ph: "professor@..." }, { label: "Telefone", ph: "+244..." }].map((f, i) => (
      <div key={i}><label className="text-xs text-muted-foreground">{f.label}</label><input className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" placeholder={f.ph} /></div>
    ))}
  </div>
  <Button onClick={() => toast.success("Inscrição enviada!")} className="w-full">Enviar inscrição</Button>
</div>) }
