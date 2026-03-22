"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ReportDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Report #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Tipo:</strong> Chat spam</p><p className="text-xs"><strong>Reporter:</strong> @viewer1</p><p className="text-xs"><strong>Reportado:</strong> @spammer1</p><p className="text-xs"><strong>Data:</strong> 20 Mar 2026 14:23</p><p className="text-xs"><strong>Evidência:</strong> &quot;spam spam spam compra aqui&quot;</p></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Timeout aplicado")} className="text-[10px]">⏱ Timeout 24h</Button><Button size="sm" variant="destructive" onClick={() => toast.success("Ban aplicado")} className="text-[10px]">🚫 Ban</Button><Button size="sm" variant="outline" onClick={() => toast.info("Ignorado")} className="text-[10px]">✗ Ignorar</Button></div></div>) }
