"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ExtensaoDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Extensão #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> Stats Overlay</p><p className="text-xs"><strong>Developer:</strong> @dev-ao-1</p><p className="text-xs"><strong>Tipo:</strong> Overlay</p></div>
  <div className="flex gap-2"><Button size="sm" onClick={() => toast.success("Aprovada")} className="text-[10px]">✅ Aprovar</Button><Button size="sm" variant="destructive" onClick={() => toast.info("Rejeitada")} className="text-[10px]">❌ Rejeitar</Button></div></div>) }
