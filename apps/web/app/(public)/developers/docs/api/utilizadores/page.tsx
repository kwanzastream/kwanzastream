"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"
import { CodeBlock } from "@/components/developers/code-block"

export default function UtilizadoresApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Utilizadores</h1>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/users/me" description="Perfil do utilizador autenticado" scopes={["user:read"]} />
          <ApiEndpointCard method="GET" path="/v1/users/:id" description="Perfil público de um utilizador" auth={false} />
          <ApiEndpointCard method="PATCH" path="/v1/users/me" description="Actualizar perfil" scopes={["user:write"]} />
        </div>
        <CodeBlock title="Resposta GET /v1/users/me" language="json" code={`{
  "id": "user_xxx",
  "username": "kambuta",
  "displayName": "Kambuta Gaming",
  "bio": "Streamer angolano",
  "avatarUrl": "https://cdn.kwanzastream.ao/...",
  "isVerified": true,
  "createdAt": "2026-01-15T10:00:00Z"
}`} />
      </div>
    </div>
  )
}
