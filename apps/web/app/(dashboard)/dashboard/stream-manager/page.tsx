"use client"
import { SmPanel, SmViewerCount, SmStreamClock, SmLiveBadge, SmQuickActionButton, SmActivityItem } from "@/components/stream-manager/sm-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Radio, Settings, X } from "lucide-react"

const ACTIVITY = [
  { time: "14:30", icon: "⚔️", text: "Raid recebido: 45 viewers de @canal_amigo" },
  { time: "14:28", icon: "🎬", text: "@clipper criou um clip" },
  { time: "14:27", icon: "👥", text: "89 viewers (pico!)" },
  { time: "14:26", icon: "🎁", text: "@gifter ofereceu 5 subscrições" },
  { time: "14:25", icon: "⭐", text: "@user subscreveu (Tier 1)" },
  { time: "14:24", icon: "💛", text: "@fan enviou 500 Salos \"Boa stream!\"" },
  { time: "14:23", icon: "🎉", text: "@viewer seguiu o canal" },
]

export default function StreamManagerPage() {
  const isLive = true
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4"><h1 className="text-lg font-black">Stream Manager</h1><SmLiveBadge isLive={isLive} />{isLive && <><SmViewerCount count={89} peak={112} /><SmStreamClock duration="02:34:17" /></>}</div>
        <div className="flex gap-2">{isLive ? <Link href="/dashboard/stream-manager/encerrar"><Button variant="outline" size="sm" className="text-xs gap-1 border-red-500/30 text-red-400"><X className="w-3 h-3" />Encerrar</Button></Link> : <Link href="/go-live"><Button size="sm" className="gap-1 bg-red-600 hover:bg-red-700 text-xs"><Radio className="w-3 h-3" />Iniciar Stream</Button></Link>}</div>
      </div>

      {/* 3-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Col 1: Preview + Info */}
        <div className="space-y-4">
          <SmPanel title="Preview" icon={<div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}>
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center"><p className="text-xs text-muted-foreground">Stream preview</p></div>
            <div className="flex items-center justify-between mt-2 text-[9px] text-muted-foreground"><span>Latência: 6.2s</span><span>720p · 2.4 Mbps</span></div>
          </SmPanel>
          <SmPanel title="Info do Stream" icon={<Settings className="w-3 h-3 text-muted-foreground" />}>
            <div className="space-y-2"><div className="text-[10px]"><p className="font-bold">Título</p><p className="text-muted-foreground">Gaming ao vivo — FIFA 26 com a comunidade 🎮</p></div><div className="text-[10px]"><p className="font-bold">Categoria</p><p className="text-muted-foreground">Gaming</p></div><Link href="/dashboard/stream-manager/info-stream"><Button variant="outline" size="sm" className="w-full text-[9px] mt-1">Editar info →</Button></Link></div>
          </SmPanel>
        </div>

        {/* Col 2: Quick Actions + Activity */}
        <div className="space-y-4">
          <SmPanel title="Acções Rápidas">
            <div className="grid grid-cols-3 gap-1.5">
              <Link href="/dashboard/stream-manager/polls"><SmQuickActionButton icon="📊" label="Poll" /></Link>
              <Link href="/dashboard/stream-manager/predictions"><SmQuickActionButton icon="🎲" label="Prediction" /></Link>
              <Link href="/dashboard/stream-manager/raid"><SmQuickActionButton icon="⚔️" label="Raid" /></Link>
              <Link href="/dashboard/stream-manager/hype-train"><SmQuickActionButton icon="🚂" label="Hype Train" /></Link>
              <Link href="/dashboard/stream-manager/marcadores"><SmQuickActionButton icon="📌" label="Marcador" /></Link>
              <Link href="/dashboard/stream-manager/clip-rapido"><SmQuickActionButton icon="✂️" label="Clip" /></Link>
            </div>
          </SmPanel>
          <SmPanel title="Actividade ao Vivo" icon={<span className="text-[10px]">⚡</span>}>
            <div className="max-h-48 overflow-y-auto space-y-0">{ACTIVITY.map((a, i) => <SmActivityItem key={i} {...a} />)}</div>
            <Link href="/dashboard/stream-manager/actividade"><p className="text-[9px] text-primary mt-2">Ver tudo →</p></Link>
          </SmPanel>
        </div>

        {/* Col 3: Chat */}
        <SmPanel title="Chat" icon={<span className="text-[10px]">💬</span>} className="lg:row-span-2">
          <div className="h-80 flex flex-col"><div className="flex-1 overflow-y-auto space-y-1 text-[10px]">{["@viewer1: Boa stream!", "@moderador: 🔥🔥🔥", "@fan: quando é o próximo torneio?", "@sub: Tier 1 ativado!", "@viewer2: Angola represent 🇦🇴", "@viewer3: GG!", "@streamer_ao: Obrigado pessoal! 🙏"].map((m, i) => <p key={i} className={`py-0.5 ${m.startsWith("@streamer") ? "text-primary font-bold" : "text-muted-foreground"}`}>{m}</p>)}</div><div className="flex gap-1 mt-2"><input placeholder="Enviar mensagem como streamer..." className="flex-1 h-7 rounded-md bg-white/5 border border-white/10 px-2 text-[10px]" /><Button size="sm" className="h-7 text-[9px] px-2">Enviar</Button></div></div>
          <Link href="/dashboard/stream-manager/chat"><p className="text-[9px] text-primary mt-2">Abrir chat completo →</p></Link>
        </SmPanel>
      </div>
    </div>
  )
}
