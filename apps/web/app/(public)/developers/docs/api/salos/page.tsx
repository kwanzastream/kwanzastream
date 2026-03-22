"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"

export default function SalosApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Salos</h1>
        <p className="text-xs text-muted-foreground">Salos são a moeda virtual da plataforma. 1 Salo = 1 animação/sticker no chat.</p>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/salos/:channelId/recent" description="Últimos Salos recebidos" scopes={["salos:read"]} />
          <ApiEndpointCard method="GET" path="/v1/salos/:channelId/top" description="Top doadores (leaderboard)" scopes={["salos:read"]} />
          <ApiEndpointCard method="GET" path="/v1/salos/:channelId/total" description="Total acumulado" scopes={["salos:read"]} />
        </div>
      </div>
    </div>
  )
}
