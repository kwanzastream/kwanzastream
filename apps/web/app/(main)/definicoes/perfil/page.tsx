"use client"

import { useState, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Camera, Loader2, Save } from "lucide-react"

export default function PerfilDefinicoesPage() {
  const { user, refreshUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ displayName: user?.displayName || "", bio: (user as any)?.bio || "", username: user?.username || "" })
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    if (!form.displayName.trim()) { toast.error("O nome de exibição é obrigatório"); return }
    setSaving(true)
    try { await api.put("/api/users/me", { displayName: form.displayName, bio: form.bio }); await refreshUser(); toast.success("Perfil actualizado!") }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao guardar") }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Foto de perfil</CardTitle></CardHeader>
        <CardContent><div className="flex items-center gap-4">
          <div className="relative"><Avatar className="w-20 h-20"><AvatarImage src={user?.avatarUrl} /><AvatarFallback className="text-xl bg-primary/20 text-primary">{user?.displayName?.slice(0, 2)}</AvatarFallback></Avatar><button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"><Camera className="w-3.5 h-3.5 text-white" /></button></div>
          <div><p className="text-sm font-medium">Actualizar foto</p><p className="text-xs text-muted-foreground mt-0.5">JPG ou PNG. Máximo 2MB.</p><Button variant="outline" size="sm" className="mt-2 h-7 text-xs" onClick={() => fileRef.current?.click()}>Escolher ficheiro</Button></div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={() => toast.info("Upload de avatar disponível em breve")} />
        </div></CardContent>
      </Card>
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Informações do perfil</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Username</Label><Input value={form.username} disabled className="bg-muted/30 text-muted-foreground" /><p className="text-xs text-muted-foreground">O username não pode ser alterado de momento.</p></div>
          <div className="space-y-1.5"><Label>Nome de exibição</Label><Input value={form.displayName} onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))} maxLength={50} placeholder="O teu nome" /></div>
          <div className="space-y-1.5"><Label>Bio</Label><Textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} placeholder="Fala um pouco sobre ti..." maxLength={300} rows={3} /><p className="text-xs text-muted-foreground text-right">{form.bio.length}/300</p></div>
          <div className="space-y-1.5"><Label>Email</Label><Input value={user?.email || ""} disabled className="bg-muted/30 text-muted-foreground" /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full gap-1.5">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" />Guardar alterações</>}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
