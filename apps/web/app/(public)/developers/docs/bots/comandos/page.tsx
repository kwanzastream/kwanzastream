"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"
export default function ComandosPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-4">
    <h1 className="text-xl font-bold">Comandos de Bot</h1>
    <p className="text-xs text-muted-foreground">Registar comandos personalizados que respondem a mensagens com prefixo <code className="text-primary">!</code>.</p>
    <div className="p-3 rounded-xl border border-white/10 text-xs text-muted-foreground space-y-1">
      <p className="font-semibold mb-1">Comandos built-in:</p>
      <p>· <code className="text-primary">!uptime</code> — Tempo de stream</p>
      <p>· <code className="text-primary">!followage</code> — Há quanto tempo segues</p>
      <p>· <code className="text-primary">!commands</code> — Lista de comandos</p>
      <p>· <code className="text-primary">!so [username]</code> — Shoutout</p>
    </div>
    <CodeBlock language="javascript" title="Registar comando personalizado" code={`const commands = {
  '!rank': (msg) => \`\${msg.username}, o teu rank é Ouro!\`,
  '!salos': (msg) => \`Total Salos este stream: 1.234\`,
  '!discord': () => 'Junta-te ao Discord: discord.gg/kwanza',
}

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  if (msg.type !== 'chat.message') return
  const cmd = msg.content.split(' ')[0].toLowerCase()
  if (commands[cmd]) {
    ws.send(JSON.stringify({
      type: 'chat.send', channel: msg.channel,
      content: commands[cmd](msg)
    }))
  }
}`} />
  </div></div>)
}
