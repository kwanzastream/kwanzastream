"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function AppealDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Apelo #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Utilizador:</strong> @ex-banned</p><p className="text-xs"><strong>Ban original:</strong> Spam no chat</p><p className="text-xs"><strong>Mensagem:</strong> &quot;Peço reconsideração, foi um mal-entendido&quot;</p></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Apelo aceite — ban removido")} className="text-[10px]">✅ Aceitar apelo</Button><Button size="sm" variant="destructive" onClick={() => toast.info("Apelo rejeitado")} className="text-[10px]">❌ Rejeitar</Button></div></div>) }
