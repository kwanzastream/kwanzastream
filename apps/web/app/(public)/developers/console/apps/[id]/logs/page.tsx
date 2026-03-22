"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"

export default function LogsPage() {
  const { id } = useParams()
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get(`/api/developer/apps/${id}/logs`).then(r => setLogs(r.data || [])).catch(() => {}).finally(() => setLoading(false)) }, [id])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />App</Link>
      <h1 className="text-xl font-bold">Logs de API</h1>
      <p className="text-xs text-muted-foreground">Últimas 24h de requests</p>
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-[10px] font-mono">
          <thead><tr className="bg-white/5"><th className="px-2 py-1.5 text-left">Timestamp</th><th className="px-2 py-1.5">Método</th><th className="px-2 py-1.5 text-left">Path</th><th className="px-2 py-1.5">Status</th><th className="px-2 py-1.5">Latência</th></tr></thead>
          <tbody>{logs.map((l: any, i: number) => (
            <tr key={i} className="border-t border-white/5">
              <td className="px-2 py-1.5 text-muted-foreground">{new Date(l.timestamp).toLocaleTimeString("pt-AO")}</td>
              <td className="px-2 py-1.5 text-center"><span className={l.method === "GET" ? "text-green-400" : "text-blue-400"}>{l.method}</span></td>
              <td className="px-2 py-1.5">{l.path}</td>
              <td className="px-2 py-1.5 text-center"><span className={l.status === 200 ? "text-green-400" : "text-red-400"}>{l.status}</span></td>
              <td className="px-2 py-1.5 text-center text-muted-foreground">{l.latency}ms</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
