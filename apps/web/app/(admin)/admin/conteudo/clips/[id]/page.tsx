"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ClipDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Clip #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Título:</strong> Momento épico</p><p className="text-xs"><strong>Criador:</strong> @viewer1</p><p className="text-xs"><strong>Duração:</strong> 30s · Views: 1.200</p></div>
  <Button size="sm" variant="destructive" onClick={() => toast.success("Clip removido")} className="text-[10px]">🗑 Remover</Button></div>) }
