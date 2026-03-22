"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"

export default function ClipsApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Clips</h1>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/clips" description="Listar clips populares" auth={false} />
          <ApiEndpointCard method="GET" path="/v1/clips/:id" description="Detalhe de um clip" auth={false} />
          <ApiEndpointCard method="POST" path="/v1/clips" description="Criar clip (últimos 30s do stream)" scopes={["streams:read"]} />
          <ApiEndpointCard method="DELETE" path="/v1/clips/:id" description="Eliminar clip (só dono)" scopes={["channel:write"]} />
        </div>
      </div>
    </div>
  )
}
