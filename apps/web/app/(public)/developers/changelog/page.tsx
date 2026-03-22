"use client"
import { ChangelogEntry } from "@/components/developers/changelog-entry"
import Link from "next/link"

const VERSIONS = [
  { version: "v1.2.0", date: "20 Mar 2026", changes: ["Novo endpoint: GET /v1/clips", "EventSub: stream.offline event", "Rate limits aumentados para Partners", "Bugfix: pagination cursor em /v1/streams"] },
  { version: "v1.1.0", date: "1 Mar 2026", changes: ["Webhooks disponíveis", "OAuth scopes actualizados", "Novo endpoint: /v1/analytics/revenue", "Documentação em PT-AO completa"] },
  { version: "v1.0.0", date: "1 Fev 2026", changes: ["Lançamento inicial da API", "Endpoints: streams, users, channels, chat", "OAuth 2.0 Authorization Code Flow", "Console de developer", "Sandbox environment"] },
]

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Changelog</h1>
      <p className="text-sm text-muted-foreground">Histórico de alterações da API</p>
      <div className="space-y-4">
        {VERSIONS.map((v, i) => (
          <Link key={i} href={`/developers/changelog/${v.version}`}><ChangelogEntry {...v} /></Link>
        ))}
      </div>
    </div>
  )
}
