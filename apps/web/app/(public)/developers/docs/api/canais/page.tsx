"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"

export default function CanaisApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Canais</h1>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/channels/:username" description="Informação pública do canal" auth={false} />
          <ApiEndpointCard method="PATCH" path="/v1/channels/me" description="Actualizar título, categoria" scopes={["channel:write"]} />
          <ApiEndpointCard method="GET" path="/v1/channels/me/followers" description="Lista de seguidores" scopes={["channel:read"]} />
          <ApiEndpointCard method="GET" path="/v1/channels/me/subscribers" description="Lista de subscritores" scopes={["subscriptions:read"]} />
          <ApiEndpointCard method="GET" path="/v1/channels/me/schedule" description="Horário do canal" scopes={["channel:read"]} />
        </div>
      </div>
    </div>
  )
}
