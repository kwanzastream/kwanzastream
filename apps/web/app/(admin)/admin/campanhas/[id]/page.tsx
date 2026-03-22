"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function CampanhaDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Campanha #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Marca:</strong> Unitel</p><p className="text-xs"><strong>Orçamento:</strong> 500.000 Kz</p><p className="text-xs"><strong>Status:</strong> Activa</p></div>
  <div className="flex gap-2">{["editar","analytics","aprovar"].map(t => <Link key={t} href={`/admin/campanhas/${id}/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] capitalize">{t}</Link>)}</div></div>) }
