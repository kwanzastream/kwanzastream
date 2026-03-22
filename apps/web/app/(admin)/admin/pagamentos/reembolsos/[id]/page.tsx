"use client"
import { useParams } from "next/navigation"
export default function ReembolsoDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Reembolso #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Utilizador:</strong> @viewer1</p><p className="text-xs"><strong>Montante:</strong> 2.500 Kz</p><p className="text-xs"><strong>Motivo:</strong> Disputa resolvida</p><p className="text-xs"><strong>Status:</strong> ✅ Processado</p></div></div>) }
