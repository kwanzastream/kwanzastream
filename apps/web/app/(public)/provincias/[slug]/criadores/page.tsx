"use client"
import { useParams } from "next/navigation"
import { getProvince } from "@/lib/angola-provinces"
export default function ProvinciaCriadoresPage() { const { slug } = useParams(); const p = getProvince(slug as string); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Criadores de {p?.name || slug}</h1>
  <div className="space-y-2">{[1,2,3,4].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">C{i}</div><div><p className="text-sm font-semibold">Criador #{i}</p><p className="text-[10px] text-muted-foreground">{p?.name} · {Math.floor(Math.random()*500)+50} avg viewers</p></div></div>)}</div></div>) }
