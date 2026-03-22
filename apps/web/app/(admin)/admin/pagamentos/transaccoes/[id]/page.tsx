"use client"
import { useParams } from "next/navigation"
export default function TransaccaoDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Transacção #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Tipo:</strong> Compra de Salos</p><p className="text-xs"><strong>De:</strong> @viewer1</p><p className="text-xs"><strong>Para:</strong> @streamer1</p><p className="text-xs"><strong>Montante:</strong> 500 Salos (430 Kz)</p><p className="text-xs"><strong>Comissão:</strong> 86 Kz (20%)</p></div></div>) }
