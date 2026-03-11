"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Eye, ShieldBan, UserX } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

export default function PrivacidadePage() {
  const [prefs, setPrefs] = useState({ publicProfile: true, showOnline: true, allowDMs: true, showActivity: true })
  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  return (
    <div className="space-y-6 max-w-lg">
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base flex items-center gap-2"><Eye className="w-4 h-4" />Visibilidade</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[{ key: "publicProfile" as const, label: "Perfil público", desc: "Qualquer pessoa pode ver o teu perfil" }, { key: "showOnline" as const, label: "Mostrar estado online", desc: "Outros podem ver quando estás online" }, { key: "allowDMs" as const, label: "Permitir mensagens directas", desc: "De qualquer utilizador" }, { key: "showActivity" as const, label: "Mostrar actividade", desc: "Streams que estás a ver aparecem no teu perfil" }].map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4"><div className="flex-1"><Label className="text-sm font-medium">{item.label}</Label><p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p></div><Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} /></div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldBan className="w-4 h-4" />Utilizadores bloqueados</CardTitle><CardDescription>Utilizadores que bloqueaste não podem ver o teu perfil ou interagir contigo</CardDescription></CardHeader>
        <CardContent>
          <div className="text-center py-6"><UserX className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-40" /><p className="text-sm text-muted-foreground">Nenhum utilizador bloqueado</p></div>
        </CardContent>
      </Card>
      <Button className="w-full" onClick={() => { localStorage.setItem("privacy_prefs", JSON.stringify(prefs)); toast.success("Preferências guardadas!") }}>Guardar preferências</Button>
    </div>
  )
}
