"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function OverlayDetailPage() {
  const { id } = useParams()
  const url = `https://kwanzastream.ao/overlay/${id}?token=abc123`
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-config/overlays"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Overlay #{id}</h1></div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-[10px] font-bold">Browser Source URL</p><div className="flex items-center gap-2"><code className="text-[8px] font-mono flex-1 truncate">{url}</code><Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { navigator.clipboard.writeText(url); toast.success("URL copiada!") }}><Copy className="w-3 h-3" /></Button></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input defaultValue="Alertas de Salos" className="bg-white/5" /></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Largura</p><Input type="number" defaultValue={400} className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Altura</p><Input type="number" defaultValue={200} className="bg-white/5" /></div></div>
      <div className="p-8 rounded-xl border border-white/10 bg-white/5 text-center"><p className="text-xs text-muted-foreground">Preview do overlay</p><p className="text-sm font-bold text-primary mt-2">🎉 @superfan enviou 500 Kz!</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Overlay guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
