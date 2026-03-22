"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function AdminDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Admin #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Username:</strong> @ks-moderacao</p><p className="text-xs"><strong>Email:</strong> moderacao@kwanzastream.ao</p><p className="text-xs"><strong>Role:</strong> moderator</p><p className="text-xs"><strong>2FA:</strong> ✅ Activo</p><p className="text-xs"><strong>Admin desde:</strong> 1 Mar 2026</p></div>
  <div className="flex gap-2">{["editar","sessoes","logs"].map(t => <Link key={t} href={`/admin/admins/${id}/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] capitalize">{t}</Link>)}</div></div>) }
