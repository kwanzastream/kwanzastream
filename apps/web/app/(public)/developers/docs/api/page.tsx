"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ApiEndpointCard } from "@/components/developers/api-endpoint-card"
import Link from "next/link"

const RESOURCES = [
  { title: "Utilizadores", href: "/developers/docs/api/utilizadores", endpoints: 3 },
  { title: "Streams", href: "/developers/docs/api/streams", endpoints: 4 },
  { title: "Canais", href: "/developers/docs/api/canais", endpoints: 5 },
  { title: "Chat", href: "/developers/docs/api/chat", endpoints: 4 },
  { title: "Salos", href: "/developers/docs/api/salos", endpoints: 3 },
  { title: "Clips", href: "/developers/docs/api/clips", endpoints: 4 },
  { title: "Analytics", href: "/developers/docs/api/analytics", endpoints: 3 },
  { title: "Webhooks", href: "/developers/docs/api/webhooks", endpoints: 5 },
  { title: "EventSub", href: "/developers/docs/api/eventsub", endpoints: 3 },
]

export default function ApiHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      <DocsSidebar />
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Referência da API</h1>
        <p className="text-sm text-muted-foreground">Base URL: <code className="text-primary">https://api.kwanzastream.ao/v1/</code></p>
        <div className="grid grid-cols-2 gap-3">
          {RESOURCES.map((r, i) => (
            <Link key={i} href={r.href} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all">
              <p className="text-sm font-semibold">{r.title}</p>
              <p className="text-[10px] text-muted-foreground">{r.endpoints} endpoints</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
