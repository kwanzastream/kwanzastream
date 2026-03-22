"use client"
import { useParams } from "next/navigation"
export default function FeatureFlagDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Flag: {id}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> {id}</p><p className="text-xs"><strong>Status:</strong> Activa</p><p className="text-xs"><strong>Rollout:</strong> 100%</p></div></div>) }
