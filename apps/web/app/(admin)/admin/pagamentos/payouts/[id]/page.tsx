"use client"
import { useParams } from "next/navigation"
export default function PayoutDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Payout #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Streamer:</strong> @streamer</p><p className="text-xs"><strong>Montante:</strong> 45.000 Kz</p><p className="text-xs"><strong>Status:</strong> Processado</p></div></div>) }
