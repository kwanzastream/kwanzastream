"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Copy, RotateCw } from "lucide-react"
import { toast } from "sonner"

export function StreamKeyCard({ serverUrl }: { serverUrl?: string }) {
  const [show, setShow] = useState(false)
  const key = "live_kz_a1b2c3d4e5f6g7h8i9j0k1l2m3n4"
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
        <p className="text-[10px] font-bold mb-2">🔑 A tua Stream Key</p>
        <div className="flex items-center gap-2"><code className="text-xs font-mono flex-1 truncate">{show ? key : "••••••••••••••••••••••••••••"}</code><Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setShow(!show)}>{show ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}</Button></div>
        <div className="flex gap-1 mt-2"><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={() => { navigator.clipboard.writeText(key); toast.success("Key copiada!") }}><Copy className="w-2.5 h-2.5" />Copiar</Button></div>
        <p className="text-[8px] text-yellow-400 mt-2">⚠️ Nunca partilhes a tua stream key!</p>
      </div>
      {serverUrl && <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Servidor RTMP</p><div className="flex items-center gap-2"><code className="text-[9px] font-mono flex-1">{serverUrl}</code><Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { navigator.clipboard.writeText(serverUrl); toast.success("URL copiada!") }}><Copy className="w-2.5 h-2.5" /></Button></div></div>}
    </div>
  )
}

export function OverlayCard({ name, type, url }: { name: string; type: string; url: string }) {
  return (
    <div className="p-3 rounded-xl border border-white/10">
      <div className="flex justify-between"><p className="text-xs font-bold">{name}</p><span className="text-[8px] text-muted-foreground">{type}</span></div>
      <div className="flex items-center gap-2 mt-1"><code className="text-[8px] font-mono flex-1 truncate text-muted-foreground">{url}</code><Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { navigator.clipboard.writeText(url); toast.success("URL copiada!") }}><Copy className="w-2.5 h-2.5" /></Button></div>
    </div>
  )
}
