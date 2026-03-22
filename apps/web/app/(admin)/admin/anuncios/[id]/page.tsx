"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function AnuncioDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Anúncio #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Marca:</strong> Unitel</p><p className="text-xs"><strong>Formato:</strong> Pre-roll 15s</p><p className="text-xs"><strong>Orçamento:</strong> 200.000 Kz</p></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Aprovado")} className="text-[10px]">✅ Aprovar</Button><Button size="sm" variant="destructive" onClick={() => toast.info("Rejeitado")} className="text-[10px]">❌ Rejeitar</Button></div></div>) }
