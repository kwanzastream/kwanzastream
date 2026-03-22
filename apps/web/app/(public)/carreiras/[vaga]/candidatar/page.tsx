"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function CandidatarPage() {
  const { vaga } = useParams()
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">Candidatura — {(vaga as string).replaceAll("-", " ")}</h1>
      <div className="space-y-3">{[{ l: "Nome completo", ph: "O teu nome" }, { l: "Email", ph: "Email" }, { l: "Telefone", ph: "+244 XXX XXX XXX" }, { l: "LinkedIn", ph: "https://linkedin.com/in/..." }, { l: "Portfolio/GitHub", ph: "https://..." }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
        <div><label className="text-[10px] text-muted-foreground">Porque queres juntar-te?</label><textarea placeholder="Conta-nos..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[100px]" /></div>
        <div><label className="text-[10px] text-muted-foreground">CV (PDF)</label><input type="file" accept=".pdf" className="w-full mt-1 text-xs" /></div>
        <Button onClick={() => toast.success("Candidatura enviada! Entraremos em contacto.")} className="w-full text-xs">Enviar candidatura</Button>
      </div>
    </div>
  )
}
