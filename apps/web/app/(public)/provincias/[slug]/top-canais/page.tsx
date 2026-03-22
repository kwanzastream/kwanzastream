"use client"
import { useParams } from "next/navigation"
import { getProvince } from "@/lib/angola-provinces"
export default function TopCanaisPage() { const { slug } = useParams(); const p = getProvince(slug as string); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Top Canais de {p?.name || slug}</h1>
  <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><span className="text-lg font-bold text-muted-foreground w-6">{i}</span><div className="flex-1"><p className="text-sm font-semibold">Canal #{i}</p><p className="text-[10px] text-muted-foreground">{Math.floor(Math.random()*1000)+100} followers · {Math.floor(Math.random()*200)+20} avg viewers</p></div></div>)}</div></div>) }
