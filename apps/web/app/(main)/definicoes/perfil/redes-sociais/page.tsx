"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Instagram, Youtube, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const NETWORKS = [
  { id: "instagram", label: "Instagram", placeholder: "@username ou URL", icon: "📷" },
  { id: "youtube", label: "YouTube", placeholder: "URL do canal", icon: "📺" },
  { id: "tiktok", label: "TikTok", placeholder: "@username", icon: "🎵" },
  { id: "twitter", label: "Twitter/X", placeholder: "@username", icon: "🐦" },
  { id: "whatsapp", label: "WhatsApp", placeholder: "9XX XXX XXX", icon: "💬" },
  { id: "facebook", label: "Facebook", placeholder: "URL da página", icon: "👤" },
  { id: "site", label: "Site", placeholder: "https://...", icon: "🌐" },
]

export default function RedesSociaisPage() {
  const [dirty, setDirty] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/perfil"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Redes Sociais</h1></div>
      <p className="text-[10px] text-muted-foreground">Exibidas na página /sobre do teu canal.</p>
      <div className="space-y-3">{NETWORKS.map(n => <div key={n.id} className="flex items-center gap-3"><span className="text-lg w-6">{n.icon}</span><div className="flex-1 space-y-0.5"><p className="text-[10px] font-bold">{n.label}</p><Input value={values[n.id] || ""} onChange={e => { setValues({...values, [n.id]: e.target.value}); setDirty(true) }} placeholder={n.placeholder} className="bg-white/5 h-8 text-xs" /></div></div>)}</div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
