"use client"
import { useParams } from "next/navigation"
export default function LogDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Log #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Admin:</strong> @kwanzastream</p><p className="text-xs"><strong>Acção:</strong> user.ban</p><p className="text-xs"><strong>Alvo:</strong> @spammer1</p><p className="text-xs"><strong>IP:</strong> 41.x.x.x</p><p className="text-xs"><strong>Data:</strong> 22 Mar 2026 09:23:45 WAT</p><p className="text-xs"><strong>Detalhes:</strong> {'{'} reason: &quot;Spam persistente&quot; {'}'}</p></div></div>) }
