"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"
export default function ChatBotsPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-4">
    <h1 className="text-xl font-bold">Chat Bots</h1>
    <p className="text-xs text-muted-foreground">Conecta um bot ao chat de qualquer canal via WebSocket.</p>
    <CodeBlock language="javascript" title="Conectar bot ao chat" code={`const ws = new WebSocket('wss://chat.kwanzastream.ao')

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth', token: BOT_ACCESS_TOKEN
  }))
  ws.send(JSON.stringify({
    type: 'join', channel: 'kambuta'
  }))
}

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  if (msg.type === 'chat.message') {
    if (msg.content.startsWith('!')) {
      // Processar comando
      handleCommand(msg)
    }
  }
}

function handleCommand(msg) {
  if (msg.content === '!uptime') {
    ws.send(JSON.stringify({
      type: 'chat.send',
      channel: msg.channel,
      content: 'O stream está live há 2h30!'
    }))
  }
}`} />
    <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
      💡 Scopes necessários: <code className="text-primary">chat:read</code> + <code className="text-primary">chat:write</code>. Adiciona <code className="text-primary">chat:moderate</code> para timeout/ban.
    </div>
  </div></div>)
}
