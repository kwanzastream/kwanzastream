"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function CandidaturaDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Candidatura #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs"><strong>Candidato:</strong> @canal-novo</p><p className="text-xs"><strong>Tipo:</strong> Partner</p>
    <div className="grid grid-cols-2 gap-2">{[{ l: "Seguidores", v: "567 (req: 500) ✅" }, { l: "Avg viewers", v: "28 (req: 25) ✅" }, { l: "Horas/mês", v: "28h (req: 25h) ✅" }, { l: "Reports 30d", v: "0 ✅" }].map(m => <div key={m.l} className="p-2 rounded-lg border border-white/5"><p className="text-[9px] text-muted-foreground">{m.l}</p><p className="text-[10px]">{m.v}</p></div>)}</div>
  </div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Aprovado!")} className="text-[10px] h-7">✅ Aprovar + enviar contrato</Button><Button size="sm" variant="destructive" onClick={() => toast.info("Rejeitado")} className="text-[10px] h-7">❌ Rejeitar</Button><Button size="sm" variant="outline" onClick={() => toast.info("Pedido enviado")} className="text-[10px] h-7">📋 Pedir info</Button></div>
</div>) }
