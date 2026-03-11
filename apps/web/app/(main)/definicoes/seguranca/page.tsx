"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function SegurancaPage() {
  const { logout } = useAuth()
  const router = useRouter()
  const [pw, setPw] = useState({ current: "", new_: "", confirm: "" })
  const [show, setShow] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleChange = async () => {
    if (pw.new_ !== pw.confirm) { toast.error("As passwords não coincidem"); return }
    if (pw.new_.length < 8) { toast.error("Mínimo 8 caracteres"); return }
    setSaving(true)
    try { await api.put("/api/users/me/password", { currentPassword: pw.current, newPassword: pw.new_ }); toast.success("Password alterada!"); setPw({ current: "", new_: "", confirm: "" }) }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao alterar") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try { await api.delete("/api/users/me"); await logout(); router.push("/"); toast.success("Conta eliminada") }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao eliminar") }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Alterar password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[{ key: "current" as const, label: "Password actual" }, { key: "new_" as const, label: "Nova password" }, { key: "confirm" as const, label: "Confirmar" }].map((f) => (
            <div key={f.key} className="space-y-1.5"><Label>{f.label}</Label><div className="relative"><Input type={show ? "text" : "password"} value={pw[f.key]} onChange={(e) => setPw((p) => ({ ...p, [f.key]: e.target.value }))} className="pr-10" /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShow((v) => !v)}>{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
          ))}
          <Button onClick={handleChange} disabled={saving || !pw.current || !pw.new_ || !pw.confirm} className="w-full">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Alterar password"}</Button>
        </CardContent>
      </Card>
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Sessões activas</CardTitle><CardDescription>Dispositivos com sessão aberta</CardDescription></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Sessão actual</p><p className="text-xs text-muted-foreground">Luanda, Angola · Agora</p></div><span className="text-xs text-green-500">Activa</span></div>
          <Separator className="my-3" />
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={async () => { try { await api.post("/api/auth/logout"); await logout(); router.push("/entrar"); toast.success("Sessões terminadas") } catch { toast.error("Erro") } }}>Terminar todas as outras sessões</Button>
        </CardContent>
      </Card>
      <Card className="border-destructive/30"><CardHeader><CardTitle className="text-base flex items-center gap-2 text-destructive"><AlertTriangle className="w-4 h-4" />Zona de perigo</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground mb-4">Eliminar a tua conta é permanente e irreversível.</p>
          <AlertDialog><AlertDialogTrigger asChild><Button variant="destructive" size="sm">Eliminar conta</Button></AlertDialogTrigger>
            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Tens a certeza absoluta?</AlertDialogTitle><AlertDialogDescription>Esta acção não pode ser desfeita. Todos os dados serão permanentemente eliminados.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>Eliminar definitivamente</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
