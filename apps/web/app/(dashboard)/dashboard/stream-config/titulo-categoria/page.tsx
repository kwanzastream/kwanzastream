"use client"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function TituloCategoriaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📝 Título e Categoria</h1>
      <div className="space-y-1"><p className="text-[10px] font-bold">Título padrão</p><Input defaultValue="Stream de Gaming — @username" className="bg-white/5" /><p className="text-[8px] text-muted-foreground">Pré-preenche ao iniciar stream</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Categoria padrão</p><select className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>Gaming</option><option>Just Chatting</option><option>Music</option><option>Educational</option><option>Sports</option><option>Creative</option></select></div>
      <p className="text-[8px] text-muted-foreground">Podes alterar antes de cada stream. Isto é só o valor inicial.</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Título/categoria guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
