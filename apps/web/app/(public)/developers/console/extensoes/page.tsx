"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Puzzle } from "lucide-react"
export default function ExtensoesConsolePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-2xl font-bold">Extensões</h1><Link href="/developers/console/extensoes/criar"><Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Nova</Button></Link></div>
      <div className="text-center py-12 space-y-3"><Puzzle className="w-10 h-10 text-muted-foreground mx-auto" /><p className="text-sm text-muted-foreground">Sem extensões registadas.</p><Link href="/developers/console/extensoes/criar"><Button>Criar extensão</Button></Link></div>
    </div>
  )
}
