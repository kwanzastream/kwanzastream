"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Download, Globe } from "lucide-react"
import Link from "next/link"

const SOFTWARE = [
  { id: "obs", label: "OBS Studio", desc: "Gratuito · Open-source · Recomendado", badge: "Recomendado", href: "/go-live/desktop/obs" },
  { id: "streamlabs", label: "Streamlabs", desc: "Interface simples · Alertas integrados", href: "/go-live/desktop/streamlabs" },
  { id: "xsplit", label: "XSplit", desc: "Profissional · Versão gratuita disponível", href: "/go-live/desktop/xsplit" },
]

export default function GoLiveDesktopPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <Monitor className="w-10 h-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-black">Transmitir do desktop</h1>
          <p className="text-sm text-muted-foreground mt-1">Escolhe como queres transmitir do computador</p>
        </div>

        {/* Browser (primary) */}
        <Link href="/go-live/desktop/browser">
          <div className="rounded-xl border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 p-5 flex items-center gap-4 transition-all cursor-pointer mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Browser directo</h3>
                <Badge className="bg-primary/20 text-primary border-none text-[9px]">Sem instalação</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Transmite directamente do browser sem instalar nada</p>
            </div>
          </div>
        </Link>

        {/* Software options */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">ou usa software externo</p>
          {SOFTWARE.map((s) => (
            <Link key={s.id} href={s.href}>
              <div className="rounded-xl border border-white/10 hover:border-white/30 p-4 flex items-center gap-3 transition-all cursor-pointer mb-2">
                <Download className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">{s.label}</h3>
                    {s.badge && <Badge variant="secondary" className="text-[9px]">{s.badge}</Badge>}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
