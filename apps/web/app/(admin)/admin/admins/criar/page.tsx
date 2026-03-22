"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function AdminCriarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Criar Admin</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Username", ph: "@ks-moderacao" }, { l: "Email", ph: "moderacao@kwanzastream.ao" }, { l: "Role", ph: "moderator" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
    <div className="p-3 rounded-xl border border-white/10 space-y-1"><p className="text-[10px] text-muted-foreground">⚠️ O novo admin receberá um email com link para definir password e configurar 2FA. O 2FA é obrigatório para todos os admins.</p></div>
    <Button onClick={() => toast.success("Admin criado! Email enviado.")} className="text-xs">Criar admin</Button></div></div>) }
