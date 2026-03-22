"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function TorneioDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Torneio #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> Torneio FIFA</p><p className="text-xs"><strong>Participantes:</strong> 32</p><p className="text-xs"><strong>Prémio:</strong> 50.000 Kz</p></div>
  <div className="flex gap-2">{["gerir","moderar"].map(t => <Link key={t} href={`/admin/torneios/${id}/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] capitalize">{t}</Link>)}</div></div>) }
