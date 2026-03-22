"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function StreamerDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Streamer #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs"><strong>Username:</strong> @streamer</p><p className="text-xs"><strong>Status:</strong> Afiliado</p><p className="text-xs"><strong>Seguidores:</strong> 567</p></div>
  <div className="flex gap-2">{["analytics","streams","monetizacao","moderacao"].map(t => <Link key={t} href={`/admin/streamers/${id}/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] hover:border-primary/20 capitalize">{t}</Link>)}</div></div>) }
