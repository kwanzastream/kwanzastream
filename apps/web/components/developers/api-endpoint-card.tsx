"use client"

import { Badge } from "@/components/ui/badge"

interface ApiEndpointCardProps { method: string; path: string; description: string; auth?: boolean; scopes?: string[] }

const METHOD_COLORS: Record<string, string> = { GET: "bg-green-500/10 text-green-400", POST: "bg-blue-500/10 text-blue-400", PATCH: "bg-yellow-500/10 text-yellow-400", DELETE: "bg-red-500/10 text-red-400", PUT: "bg-orange-500/10 text-orange-400" }

export function ApiEndpointCard({ method, path, description, auth = true, scopes }: ApiEndpointCardProps) {
  return (
    <div className="p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all space-y-1.5">
      <div className="flex items-center gap-2">
        <Badge className={`text-[9px] font-mono ${METHOD_COLORS[method] || ""}`}>{method}</Badge>
        <code className="text-xs font-mono text-primary">{path}</code>
        {auth && <Badge variant="outline" className="text-[8px]">🔒</Badge>}
      </div>
      <p className="text-[10px] text-muted-foreground">{description}</p>
      {scopes && <div className="flex gap-1 flex-wrap">{scopes.map(s => <Badge key={s} variant="outline" className="text-[8px]">{s}</Badge>)}</div>}
    </div>
  )
}
