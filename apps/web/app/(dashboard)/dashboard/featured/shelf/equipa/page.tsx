"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Users, Info } from "lucide-react"
import Link from "next/link"

const MOCK_MEMBERS = [
  { id: "1", username: "membro1", displayName: "Membro 1", category: "Gaming", lastActive: "2 dias", checked: true },
  { id: "2", username: "membro2", displayName: "Membro 2", category: "Música", lastActive: "5 dias", checked: true },
  { id: "3", username: "membro3", displayName: "Membro 3", category: "Just Talking", lastActive: "45 dias", checked: false },
]

export default function ShelfEquipaPage() {
  return (
    <div className="space-y-6">
      <Link href="/dashboard/featured/shelf" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold flex items-center gap-2">
        <Users className="w-5 h-5" /> Membros da Shelf
      </h2>

      <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-blue-200">Funcionalidade de equipas disponível em v2.</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Quando estiver activo, podes seleccionar quais membros da equipa aparecem na shelf do teu canal.
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        {MOCK_MEMBERS.map(m => (
          <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
            <input type="checkbox" defaultChecked={m.checked} className="rounded" disabled />
            <div className="flex-1">
              <p className="text-sm font-medium">@{m.username} · {m.category}</p>
              <p className="text-[10px] text-muted-foreground">
                {m.checked ? `Activo (stream há ${m.lastActive})` : `Inactivo (há ${m.lastActive})`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-muted-foreground">
        Ordenação: por actividade recente (automático) · Máximo visível: 6 membros
      </div>

      <Button disabled className="gap-1.5">Guardar preferências</Button>
    </div>
  )
}
