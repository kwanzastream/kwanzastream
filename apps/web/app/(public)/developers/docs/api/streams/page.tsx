"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"
import { CodeBlock } from "@/components/developers/code-block"

export default function StreamsApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Streams</h1>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/streams" description="Listar streams (live, vod, all)" auth={false} />
          <ApiEndpointCard method="GET" path="/v1/streams/live" description="Apenas streams em directo" auth={false} />
          <ApiEndpointCard method="GET" path="/v1/streams/:id" description="Detalhe de um stream" auth={false} />
          <ApiEndpointCard method="GET" path="/v1/streams/:id/viewers" description="Contagem de viewers" scopes={["streams:read"]} />
        </div>
        <CodeBlock title="GET /v1/streams?status=live&limit=10" language="json" code={`{
  "data": [{
    "id": "stream_xxx", "username": "canal",
    "title": "Stream de Gaming", "category": { "id": "gaming", "name": "Gaming" },
    "viewers": 234, "startedAt": "2026-03-20T20:00:00Z"
  }],
  "pagination": { "cursor": "eyJ..." }
}`} />
        <div className="p-3 rounded-xl border border-white/10 text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Parâmetros de query:</p>
          <p>· <code className="text-primary">status</code>: "live" | "vod" | "all" (default: "all")</p>
          <p>· <code className="text-primary">category</code>: filtrar por categoria</p>
          <p>· <code className="text-primary">limit</code>: 1-100 (default: 20)</p>
          <p>· <code className="text-primary">cursor</code>: paginação cursor-based</p>
        </div>
      </div>
    </div>
  )
}
