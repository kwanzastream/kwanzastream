"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"

export default function ChatApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Chat</h1>
        <div className="space-y-3">
          <ApiEndpointCard method="GET" path="/v1/chat/:channelId/messages" description="Últimas mensagens do chat" scopes={["chat:read"]} />
          <ApiEndpointCard method="POST" path="/v1/chat/:channelId/send" description="Enviar mensagem" scopes={["chat:write"]} />
          <ApiEndpointCard method="POST" path="/v1/chat/:channelId/timeout" description="Timeout de utilizador" scopes={["chat:moderate"]} />
          <ApiEndpointCard method="POST" path="/v1/chat/:channelId/ban" description="Ban de utilizador" scopes={["chat:moderate"]} />
        </div>
        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">
          ⚠️ Rate limit de chat: 20 mensagens/30s para bots, 100 mensagens/30s para bots com scope <code className="text-primary">chat:moderate</code>.
        </div>
      </div>
    </div>
  )
}
