"use client"
import { useParams } from "next/navigation"
export default function TagDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Tag #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> Português</p><p className="text-xs"><strong>Streams a usar:</strong> 234</p></div></div>) }
