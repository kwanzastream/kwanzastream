"use client"
import { ArrowLeft, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function BrowserSourcePage() {
  const url = "https://kwanzastream.ao/collab/overlay/abc123"
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/colaboracoes/stream-together"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Browser Source</h1></div>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5"><p className="text-[10px] font-bold mb-2">Browser Source URL</p><div className="flex items-center gap-2"><code className="text-[9px] font-mono flex-1 truncate">{url}</code><Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { navigator.clipboard.writeText(url); toast.success("URL copiada!") }}><Copy className="w-3 h-3" /></Button></div></div>
      <div className="p-3 rounded-xl border border-white/10 space-y-1"><p className="text-xs font-bold">Como usar</p><ol className="text-[9px] text-muted-foreground space-y-1 list-decimal pl-4"><li>Abre o OBS Studio</li><li>Adiciona uma Browser Source</li><li>Cola o URL acima</li><li>Dimensões: 1280×720</li></ol></div>
    </div>
  )
}
