"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"

export default function AnalyticsApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Analytics</h1>
        <p className="text-xs text-muted-foreground">Só o dono do canal pode ler os seus analytics via API.</p>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/analytics/channel" description="Métricas do canal (viewers, follows, subs)" scopes={["analytics:read"]} />
          <ApiEndpointCard method="GET" path="/v1/analytics/streams" description="Histório de streams com métricas" scopes={["analytics:read"]} />
          <ApiEndpointCard method="GET" path="/v1/analytics/revenue" description="Revenue do canal (Salos, subs, ads)" scopes={["analytics:read"]} />
        </div>
      </div>
    </div>
  )
}
