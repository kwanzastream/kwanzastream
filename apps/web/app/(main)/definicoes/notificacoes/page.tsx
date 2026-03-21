"use client"
import { useState } from "react"
import { SettingsSection, SettingsSaveBar } from "@/components/settings/settings-components"
import { Bell, Mail, Smartphone, MessageSquare, Heart, UserPlus, Gift, Radio } from "lucide-react"

interface NotifToggle {
  id: string
  label: string
  desc: string
  icon: React.ReactNode
  push: boolean
  email: boolean
}

const DEFAULT_TOGGLES: NotifToggle[] = [
  { id: "lives", label: "Canais que segues ficam ao vivo", desc: "Notificação quando um canal favorito começa uma live", icon: <Radio className="w-4 h-4 text-red-400" />, push: true, email: false },
  { id: "followers", label: "Novos seguidores", desc: "Quando alguém começa a seguir-te", icon: <UserPlus className="w-4 h-4 text-blue-400" />, push: true, email: false },
  { id: "donations", label: "Doações recebidas", desc: "Doações de viewers na tua live", icon: <Gift className="w-4 h-4 text-yellow-400" />, push: true, email: true },
  { id: "messages", label: "Mensagens directas", desc: "Novas DMs de outros utilizadores", icon: <MessageSquare className="w-4 h-4 text-green-400" />, push: true, email: false },
  { id: "likes", label: "Gostos nos teus clips", desc: "Quando alguém gosta do teu conteúdo", icon: <Heart className="w-4 h-4 text-pink-400" />, push: false, email: false },
  { id: "marketing", label: "Novidades e promoções", desc: "Actualizações da plataforma Kwanza Stream", icon: <Mail className="w-4 h-4 text-purple-400" />, push: false, email: true },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-5 rounded-full transition-all ${checked ? "bg-primary" : "bg-white/20"}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  )
}

export default function NotificacoesPage() {
  const [toggles, setToggles] = useState(DEFAULT_TOGGLES)
  const [dirty, setDirty] = useState(false)

  const updateToggle = (id: string, field: "push" | "email") => {
    setToggles(prev =>
      prev.map(t => t.id === id ? { ...t, [field]: !t[field] } : t)
    )
    setDirty(true)
  }

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2">
        <Bell className="w-5 h-5" />Notificações
      </h1>

      <SettingsSection title="Preferências de Notificação" desc="Escolhe como queres ser notificado">
        {/* Header */}
        <div className="flex items-center justify-end gap-6 px-3 pb-1">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Smartphone className="w-3 h-3" /> Push
          </div>
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Mail className="w-3 h-3" /> Email
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-0.5">
          {toggles.map(t => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
              {t.icon}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold">{t.label}</p>
                <p className="text-[8px] text-muted-foreground">{t.desc}</p>
              </div>
              <div className="flex items-center gap-6">
                <Toggle checked={t.push} onChange={() => updateToggle(t.id, "push")} />
                <Toggle checked={t.email} onChange={() => updateToggle(t.id, "email")} />
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
