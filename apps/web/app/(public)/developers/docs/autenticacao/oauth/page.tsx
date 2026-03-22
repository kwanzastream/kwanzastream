"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"

export default function OAuthPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">OAuth 2.0</h1>
        <p className="text-sm text-muted-foreground">Kwanza Stream usa OAuth 2.0 Authorization Code Flow</p>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold">Passo 1 — Redirect para autorização</h2>
          <CodeBlock language="bash" code={`GET https://kwanzastream.ao/oauth/authorize
  ?client_id={CLIENT_ID}
  &redirect_uri={REDIRECT_URI}
  &scope=user:read+streams:read+chat:write
  &response_type=code
  &state={RANDOM_STATE}`} />
          <h2 className="text-sm font-semibold">Passo 2 — Trocar code por token</h2>
          <CodeBlock language="bash" code={`POST https://api.kwanzastream.ao/v1/auth/token
Content-Type: application/json

{
  "code": "abc123",
  "client_id": "{CLIENT_ID}",
  "client_secret": "{CLIENT_SECRET}",
  "redirect_uri": "{REDIRECT_URI}",
  "grant_type": "authorization_code"
}`} />
          <h2 className="text-sm font-semibold">Resposta</h2>
          <CodeBlock language="json" code={`{
  "access_token": "kwz_at_...",
  "refresh_token": "kwz_rt_...",
  "expires_in": 900,
  "token_type": "Bearer",
  "scope": "user:read streams:read chat:write"
}`} />
        </div>
      </div>
    </div>
  )
}
