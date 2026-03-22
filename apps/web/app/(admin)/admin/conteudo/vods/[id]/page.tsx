"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function VodDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">VOD #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Título:</strong> Gaming session completa</p><p className="text-xs"><strong>Streamer:</strong> @voz-angola</p><p className="text-xs"><strong>Duração:</strong> 3h 20min · 1.2 GB</p></div>
  <Button size="sm" variant="destructive" onClick={() => toast.success("VOD removido")} className="text-[10px]">🗑 Remover VOD</Button></div>) }
