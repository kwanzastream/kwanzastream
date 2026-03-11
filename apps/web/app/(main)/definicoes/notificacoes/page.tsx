"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const PREFS = [
  { group: "Actividade", items: [
    { key: "newFollower", label: "Novo seguidor", desc: "Quando alguém começa a seguir-te" },
    { key: "donation", label: "Salos recebidos", desc: "Quando alguém te envia Salos" },
    { key: "subscription", label: "Nova subscrição", desc: "Quando alguém subscreve o teu canal" },
    { key: "mention", label: "Menções", desc: "Quando alguém te menciona no chat" },
  ]},
  { group: "Streams", items: [
    { key: "streamLive", label: "Criadores ao vivo", desc: "Quando um criador que segues vai ao vivo" },
    { key: "raid", label: "Raids", desc: "Quando recebes um raid" },
  ]},
  { group: "Canais", items: [
    { key: "email", label: "Notificações por email", desc: "Sumário semanal e alertas importantes" },
    { key: "push", label: "Notificações push", desc: "No browser ou na app móvel" },
    { key: "sms", label: "SMS", desc: "Apenas alertas críticos de segurança" },
  ]},
]

export default function NotificacoesDefinicoesPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ newFollower: true, donation: true, subscription: true, mention: true, streamLive: true, raid: true, email: true, push: false, sms: false })
  const [saving, setSaving] = useState(false)

  const toggle = (key: string) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  const handleSave = async () => {
    setSaving(true)
    try { localStorage.setItem("notif_prefs", JSON.stringify(prefs)); toast.success("Preferências guardadas!") }
    catch { toast.error("Erro ao guardar") }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-6 max-w-lg">
      {PREFS.map((g) => (
        <Card key={g.group} className="border-border/50"><CardHeader className="pb-2"><CardTitle className="text-base">{g.group}</CardTitle></CardHeader>
          <CardContent className="space-y-4">{g.items.map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4">
              <div className="flex-1"><Label className="text-sm font-medium">{item.label}</Label><p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p></div>
              <Switch checked={prefs[item.key] ?? false} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}</CardContent>
        </Card>
      ))}
      <Button onClick={handleSave} disabled={saving} className="w-full">Guardar preferências</Button>
    </div>
  )
}
