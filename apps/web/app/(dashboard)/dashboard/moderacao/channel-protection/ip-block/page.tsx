"use client"
import { useState } from "react"
import { ArrowLeft, Plus, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function IPBlockPage() {
  const [ips, setIps] = useState<string[]>([])
  const [newIP, setNewIP] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/channel-protection"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🔒 IP Block</h1></div>
      <p className="text-xs text-muted-foreground">IPs bloqueados: {ips.length}</p>
      <div className="flex gap-2"><Input value={newIP} onChange={e => setNewIP(e.target.value)} placeholder="192.168.1.1 ou 192.168.1.0/24" className="bg-white/5" /><Button size="sm" onClick={() => { if(newIP) { setIps([...ips, newIP]); setNewIP(""); toast.success("IP bloqueado!") }}}><Plus className="w-3 h-3" /></Button></div>
      {ips.map(ip => <div key={ip} className="flex items-center justify-between p-2 rounded border border-white/10"><span className="text-xs font-mono">{ip}</span><Button size="sm" variant="ghost" className="text-red-400 h-6" onClick={() => setIps(ips.filter(x => x !== ip))}><X className="w-3 h-3" /></Button></div>)}
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" /><p className="text-[9px] text-muted-foreground">Use com cautela — pode bloquear utilizadores legítimos que partilham IPs (ex: operadoras Angola).</p></div>
    </div>
  )
}
