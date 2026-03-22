"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"
import { CodeBlock } from "@/components/developers/code-block"

export default function WebhooksApiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">Webhooks</h1>
        <p className="text-xs text-muted-foreground">Recebe notificações server-to-server de eventos na plataforma.</p>
        <div className="space-y-3">
          <ApiEndpointCard method="POST" path="/v1/webhooks" description="Criar webhook" scopes={["webhooks:write"]} />
          <ApiEndpointCard method="GET" path="/v1/webhooks" description="Listar webhooks" scopes={["webhooks:write"]} />
          <ApiEndpointCard method="DELETE" path="/v1/webhooks/:id" description="Eliminar webhook" scopes={["webhooks:write"]} />
        </div>
        <h2 className="text-sm font-semibold">Eventos disponíveis</h2>
        <div className="p-3 rounded-xl border border-white/10 text-xs text-muted-foreground space-y-1">
          <p>· <code className="text-primary">stream.online</code> / <code className="text-primary">stream.offline</code></p>
          <p>· <code className="text-primary">channel.follow</code> / <code className="text-primary">channel.unfollow</code></p>
          <p>· <code className="text-primary">channel.subscribe</code> / <code className="text-primary">channel.unsubscribe</code></p>
          <p>· <code className="text-primary">donations.received</code></p>
          <p>· <code className="text-primary">chat.message</code> (alto volume)</p>
        </div>
        <h2 className="text-sm font-semibold">Verificar autenticidade</h2>
        <CodeBlock language="javascript" title="Verificação HMAC-SHA256" code={`const crypto = require('crypto')

const signature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex')

if (signature !== req.headers['x-kwanzastream-signature']) {
  return res.status(401).send('Invalid signature')
}`} />
      </div>
    </div>
  )
}
