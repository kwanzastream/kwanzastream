"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function CoStreamActivaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🔴 CO-STREAM AO VIVO</h1>
      <div className="space-y-2">{[{ch:"@teu-canal",viewers:234,you:true},{ch:"@canal-parceiro",viewers:189}].map(p => <div key={p.ch} className={`flex items-center justify-between p-3 rounded-xl border ${p.you ? "border-primary/20 bg-primary/5" : "border-white/10"}`}><span className="text-xs font-bold">{p.ch}{p.you ? " (tu)" : ""}</span><div className="flex items-center gap-2"><span className="text-[9px]">👁 {p.viewers}</span>{!p.you && <Button size="sm" variant="outline" className="text-[8px] h-6 text-red-400" onClick={() => toast.info("Removido")}>Remover</Button>}</div></div>)}</div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-center"><p className="text-xs font-bold">Combined: 👁 423 viewers</p></div>
      <Button variant="outline" className="w-full text-xs text-red-400 border-red-400/20" onClick={() => toast.success("Co-stream encerrado")}>Encerrar co-stream</Button>
    </div>
  )
}
