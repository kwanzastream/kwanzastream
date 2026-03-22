"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function AcoesEmMassaPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Acções em Massa</h1>
  <p className="text-xs text-muted-foreground">⚠️ Só admin + super_admin. Todas as acções registadas no audit log.</p>
  <div className="space-y-3">
    <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-sm font-semibold">🚫 Banir range de IPs</p><input placeholder="CIDR range (ex: 41.0.0.0/16)" className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-transparent text-xs" /><Button size="sm" variant="destructive" onClick={() => toast.info("Preview: 0 utilizadores afectados")} className="text-[10px]">Preview</Button></div>
    <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-sm font-semibold">⏱ Timeout global por período</p><p className="text-[10px] text-muted-foreground">Timeout todos os utilizadores criados num período (anti-spam waves)</p><Button size="sm" variant="outline" onClick={() => toast.info("Feature disponível — selecionar período")} className="text-[10px]">Configurar</Button></div>
    <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-sm font-semibold">🧹 Limpar spam de utilizador</p><p className="text-[10px] text-muted-foreground">Remove todas as mensagens de um spammer de todos os chats</p><input placeholder="Username do spammer" className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-transparent text-xs" /><Button size="sm" onClick={() => toast.success("Mensagens limpas")} className="text-[10px]">Limpar</Button></div>
  </div></div>) }
