"use client"

import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"

export default function IntroducaoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Primeiros Passos</h1>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <p className="text-sm font-semibold">1. Criar uma app no Console</p>
            <p className="text-xs text-muted-foreground">Vai ao Console de Developer e cria uma nova aplicação. Recebes um Client ID imediatamente.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <p className="text-sm font-semibold">2. Obter Client ID e Client Secret</p>
            <p className="text-xs text-muted-foreground">Na página de credenciais da tua app, clica "Mostrar Secret" para ver o Client Secret pela primeira vez.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <p className="text-sm font-semibold">3. Implementar OAuth</p>
            <p className="text-xs text-muted-foreground">Redirige o utilizador para a página de autorização e troca o code por um access token.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <p className="text-sm font-semibold">4. Fazer o primeiro pedido</p>
            <p className="text-xs text-muted-foreground">Usa o token para chamar a API REST.</p>
          </div>
        </div>
        <CodeBlock title="Exemplo (cURL)" language="bash" code={`curl -H "Authorization: Bearer {token}" \\
     https://api.kwanzastream.ao/v1/streams/live`} />
        <CodeBlock title="Exemplo (JavaScript)" language="javascript" code={`const response = await fetch(
  'https://api.kwanzastream.ao/v1/streams/live',
  { headers: { 'Authorization': \`Bearer \${token}\` } }
)
const data = await response.json()
console.log(data)`} />
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
          💡 Base URL: <code className="text-primary">https://api.kwanzastream.ao/v1/</code> — todos os endpoints são relativos a este URL.
        </div>
      </div>
    </div>
  )
}
