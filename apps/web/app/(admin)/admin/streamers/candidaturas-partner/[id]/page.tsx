"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function CandidaturaPartnerDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Candidatura Partner #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs"><strong>Candidato:</strong> @streamer-partner</p>
    <div className="grid grid-cols-2 gap-2">{[{ l: "Seguidores", v: "1.200 ✅" }, { l: "Avg viewers", v: "85 ✅" }, { l: "Horas/mês", v: "45h ✅" }, { l: "Afiliado há", v: "6 meses ✅" }].map(m => <div key={m.l} className="p-2 rounded-lg border border-white/5"><p className="text-[9px] text-muted-foreground">{m.l}</p><p className="text-[10px]">{m.v}</p></div>)}</div></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Partner aprovado!")} className="text-[10px] h-7">✅ Aprovar</Button><Button size="sm" variant="destructive" onClick={() => toast.info("Rejeitado")} className="text-[10px] h-7">❌ Rejeitar</Button></div>
</div>) }
