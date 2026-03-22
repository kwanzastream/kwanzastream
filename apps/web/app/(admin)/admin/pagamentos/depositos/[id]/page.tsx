"use client"
import { useParams } from "next/navigation"
export default function DepositoDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Depósito #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Utilizador:</strong> @viewer1</p><p className="text-xs"><strong>Montante:</strong> 5.000 Kz</p><p className="text-xs"><strong>Método:</strong> Multicaixa Express</p><p className="text-xs"><strong>Referência:</strong> 12345678</p><p className="text-xs"><strong>Status:</strong> ✅ Confirmado</p></div></div>) }
