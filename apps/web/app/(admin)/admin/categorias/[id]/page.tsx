"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function CategoriaDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Categoria #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> Gaming</p><p className="text-xs"><strong>Streams activos:</strong> 45</p><p className="text-xs"><strong>Criada:</strong> 1 Jan 2026</p></div>
  <div className="flex gap-2">{["editar","streams","stats"].map(t => <Link key={t} href={`/admin/categorias/${id}/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] capitalize">{t}</Link>)}</div></div>) }
