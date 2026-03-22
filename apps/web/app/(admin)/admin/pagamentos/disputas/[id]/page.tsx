"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function DisputaDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Disputa #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Comprador:</strong> @viewer1</p><p className="text-xs"><strong>Vendedor:</strong> @streamer1</p><p className="text-xs"><strong>Montante:</strong> 2.500 Kz</p><p className="text-xs"><strong>Motivo:</strong> Produto não entregue</p></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Reembolso aprovado")} className="text-[10px]">💰 Reembolsar comprador</Button><Button size="sm" variant="outline" onClick={() => toast.info("Resolvido a favor do vendedor")} className="text-[10px]">Favor vendedor</Button></div></div>) }
