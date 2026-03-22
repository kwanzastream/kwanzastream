"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function StreamDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Stream #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Streamer:</strong> @user</p><p className="text-xs"><strong>Título:</strong> Gaming Session</p><p className="text-xs"><strong>Início:</strong> 20 Mar 14:00 WAT</p></div>
  <div className="flex gap-2">{["chat","viewers","encerrar"].map(t => <Link key={t} href={`/admin/streams/${id}/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] capitalize">{t}</Link>)}</div></div>) }
