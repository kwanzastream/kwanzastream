"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"

export default function EventSubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-4">
        <h1 className="text-xl font-bold">EventSub (WebSocket)</h1>
        <p className="text-xs text-muted-foreground">Eventos em tempo real via WebSocket — ideal para overlays e dashboards.</p>
        <CodeBlock language="javascript" title="Conectar ao EventSub" code={`const ws = new WebSocket('wss://eventsub.kwanzastream.ao')

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    events: ['stream.online', 'chat.message'],
    token: ACCESS_TOKEN
  }))
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log(data.type, data.payload)
}`} />
        <h2 className="text-sm font-semibold">Eventos suportados</h2>
        <div className="p-3 rounded-xl border border-white/10 text-xs text-muted-foreground space-y-1">
          <p>· <code className="text-primary">stream.online</code> — stream começou</p>
          <p>· <code className="text-primary">stream.offline</code> — stream terminou</p>
          <p>· <code className="text-primary">chat.message</code> — nova mensagem no chat</p>
          <p>· <code className="text-primary">channel.follow</code> — novo seguidor</p>
          <p>· <code className="text-primary">donations.received</code> — Salo recebido</p>
        </div>
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
          💡 Heartbeat: o servidor envia um PING a cada 30s. Responde com PONG para manter a conexão.
        </div>
      </div>
    </div>
  )
}
