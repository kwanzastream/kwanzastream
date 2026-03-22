"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ScopeTable } from "@/components/developers/scope-table"

const SCOPES = [
  { scope: "user:read", desc: "Ler perfil público" }, { scope: "user:read:email", desc: "Ler email do utilizador" },
  { scope: "user:write", desc: "Actualizar perfil" }, { scope: "streams:read", desc: "Ler informação de streams" },
  { scope: "channel:read", desc: "Ler informação do canal" }, { scope: "channel:write", desc: "Actualizar canal (título, categoria)" },
  { scope: "chat:read", desc: "Ler mensagens do chat" }, { scope: "chat:write", desc: "Enviar mensagens no chat" },
  { scope: "chat:moderate", desc: "Moderar chat (timeout, ban)" }, { scope: "salos:read", desc: "Ler histórico de Salos" },
  { scope: "subscriptions:read", desc: "Ler subscritores" }, { scope: "analytics:read", desc: "Ler analytics do canal" },
  { scope: "webhooks:write", desc: "Criar e gerir webhooks" },
]

export default function ScopesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Scopes Disponíveis</h1>
        <p className="text-sm text-muted-foreground">Pede apenas os scopes que a tua app precisa. Menos scopes = mais confiança do utilizador.</p>
        <ScopeTable scopes={SCOPES} />
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
          💡 Usa <code className="text-primary">+</code> para separar scopes no URL: <code className="text-primary">scope=user:read+streams:read</code>
        </div>
      </div>
    </div>
  )
}
