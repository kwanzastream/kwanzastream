"use client"
import { useParams } from "next/navigation"
import { getProvince } from "@/lib/angola-provinces"
export default function ProvinciaStreamsPage() { const { slug } = useParams(); const p = getProvince(slug as string); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Streams em {p?.name || slug}</h1>
  <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><div className="flex-1"><p className="text-sm font-semibold">Stream #{i} — {p?.name}</p><p className="text-[10px] text-muted-foreground">Gaming · {Math.floor(Math.random()*200)+50} viewers</p></div></div>)}</div></div>) }
