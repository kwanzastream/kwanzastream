"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ConfigManutencaoPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">🔧 Manutenção</h1>
  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2"><p className="text-xs font-semibold">Modo de manutenção</p><p className="text-[10px] text-muted-foreground">Quando activo, todos os utilizadores vêem a página de manutenção. Admins continuam a ter acesso.</p>
    <Button variant="destructive" onClick={() => toast.info("Modo de manutenção: OFF")} className="text-xs">Activar manutenção</Button></div>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs font-semibold">Cache</p><p className="text-[10px] text-muted-foreground">Limpar cache global (Redis)</p>
    <Button variant="outline" onClick={() => toast.success("Cache limpo!")} className="text-xs">Limpar cache</Button></div>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs font-semibold">Prisma</p><p className="text-[10px] text-muted-foreground">Forçar regeneração do schema</p>
    <Button variant="outline" onClick={() => toast.info("Regeneração iniciada")} className="text-xs">Regenerar</Button></div></div>) }
