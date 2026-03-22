"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ClaimDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Claim Copyright #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Reclamante:</strong> Music Label AO</p><p className="text-xs"><strong>Streamer:</strong> @streamer1</p><p className="text-xs"><strong>Conteúdo:</strong> VOD id abc123 — música protegida</p></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Conteúdo removido")} className="text-[10px]">🗑 Remover conteúdo</Button><Button size="sm" variant="outline" onClick={() => toast.info("Claim rejeitado")} className="text-[10px]">❌ Rejeitar claim</Button></div></div>) }
