"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"

export default function TokensPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Access & Refresh Tokens</h1>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <p className="text-sm font-semibold">Access Token</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>· Válido por 15 minutos (900 segundos)</li>
              <li>· Enviado em cada request via header Authorization</li>
              <li>· Formato: <code className="text-primary">kwz_at_...</code></li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <p className="text-sm font-semibold">Refresh Token</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>· Válido por 30 dias</li>
              <li>· Usado para obter novo access token sem re-autorização</li>
              <li>· Formato: <code className="text-primary">kwz_rt_...</code></li>
            </ul>
          </div>
          <h2 className="text-sm font-semibold">Renovar Access Token</h2>
          <CodeBlock language="bash" code={`POST https://api.kwanzastream.ao/v1/auth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "kwz_rt_...",
  "client_id": "{CLIENT_ID}",
  "client_secret": "{CLIENT_SECRET}"
}`} />
          <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">
            ⚠️ Guarda o refresh token de forma segura. Se o perderes, o utilizador terá de re-autorizar a app.
          </div>
        </div>
      </div>
    </div>
  )
}
