"use client"
import { useParams } from "next/navigation"
export default function BanDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Ban #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-1"><p className="text-xs"><strong>Utilizador:</strong> @banned-user</p><p className="text-xs"><strong>Motivo:</strong> Conteúdo ilegal</p><p className="text-xs"><strong>Banido por:</strong> @kwanzastream</p><p className="text-xs"><strong>Data:</strong> 15 Mar 2026</p></div></div>) }
