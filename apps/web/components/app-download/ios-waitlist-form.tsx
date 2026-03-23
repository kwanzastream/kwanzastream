"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { toast } from "sonner"
export function IosWaitlistForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const submit = async () => {
    if (!email) return toast.error("Email obrigatório")
    setLoading(true)
    try { await api.post("/api/app/notify-ios", { email }); setDone(true); toast.success("Vamos avisar-te!") }
    catch { toast.error("Erro") } finally { setLoading(false) }
  }
  if (done) return <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20"><p className="text-xs text-green-400">✅ Vamos avisar-te quando a app iOS estiver disponível!</p></div>
  return (
    <div className="space-y-2"><p className="text-[10px] text-muted-foreground">🔔 Notifica-me quando disponível</p><div className="flex gap-1"><input value={email} onChange={e => setEmail(e.target.value)} placeholder="o-teu@email.ao" type="email" className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /><Button onClick={submit} disabled={loading} className="text-xs">{loading ? "..." : "Avisar-me"}</Button></div></div>
  )
}
