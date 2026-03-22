"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ShortDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Short #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Criador:</strong> @creator</p><p className="text-xs"><strong>Duração:</strong> 15s · Views: 5.600</p></div>
  <Button size="sm" variant="destructive" onClick={() => toast.success("Short removido")} className="text-[10px]">🗑 Remover</Button></div>) }
