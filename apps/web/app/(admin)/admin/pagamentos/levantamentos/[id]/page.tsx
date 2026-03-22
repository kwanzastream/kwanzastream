"use client"
import { useParams } from "next/navigation"
export default function LevantamentoDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Levantamento #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Streamer:</strong> @streamer1</p><p className="text-xs"><strong>Montante:</strong> 45.000 Kz</p><p className="text-xs"><strong>Método:</strong> Multicaixa</p><p className="text-xs"><strong>IBAN:</strong> AO06 0044 0000 1234 5678 9012 3</p><p className="text-xs"><strong>Data:</strong> 19 Mar 2026</p></div></div>) }
