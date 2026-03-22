"use client"
import { useParams } from "next/navigation"
export default function EventoDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Evento #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> Festival Kwanza</p><p className="text-xs"><strong>Data:</strong> 1 Maio 2026</p><p className="text-xs"><strong>Local:</strong> Luanda</p></div></div>) }
