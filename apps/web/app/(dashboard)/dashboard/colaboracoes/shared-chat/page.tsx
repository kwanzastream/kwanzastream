"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function SharedChatPage() {
  const [active, setActive] = useState(true)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">💬 Shared Chat</h1>
      <label className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-xs font-bold">Shared Chat (co-stream)</span><input type="checkbox" checked={active} onChange={() => setActive(!active)} /></label>
      <p className="text-[10px] font-bold">Configurações</p>
      <div className="space-y-1"><p className="text-[9px] text-muted-foreground">Cor de destaque do canal parceiro</p><input type="color" defaultValue="#8B5CF6" className="w-8 h-8 rounded" /></div>
      <div className="space-y-1"><p className="text-[9px] text-muted-foreground">Prefixo de mensagens do parceiro</p><Input defaultValue="@parceiro" className="bg-white/5" /></div>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Filtrar mensagens duplicadas</span></label>
      <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-1">Como funciona</p><ul className="text-[8px] text-muted-foreground space-y-0.5 list-disc pl-3"><li>Chats de ambos os canais unidos num feed</li><li>Mensagens do parceiro com destaque colorido</li><li>Viewers podem enviar de qualquer canal</li></ul></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Shared chat guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
