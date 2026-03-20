"use client"
import Link from "next/link"
const TABS = [{id:"key",l:"Stream Key",h:"/dashboard/stream-config/stream-key"},{id:"ingest",l:"Ingest",h:"/dashboard/stream-config/ingest"},{id:"qual",l:"Qualidade",h:"/dashboard/stream-config/qualidade"},{id:"delay",l:"Delay",h:"/dashboard/stream-config/delay"},{id:"vod",l:"VOD",h:"/dashboard/stream-config/vod-settings"},{id:"clip",l:"Clips",h:"/dashboard/stream-config/clip-settings"},{id:"raid",l:"Raid",h:"/dashboard/stream-config/raid-settings"},{id:"title",l:"Título",h:"/dashboard/stream-config/titulo-categoria"},{id:"tags",l:"Tags",h:"/dashboard/stream-config/tags"},{id:"lang",l:"Idioma",h:"/dashboard/stream-config/idioma"},{id:"class",l:"Classificação",h:"/dashboard/stream-config/classificacao-conteudo"},{id:"alerts",l:"Alertas",h:"/dashboard/stream-config/alertas"},{id:"overlays",l:"Overlays",h:"/dashboard/stream-config/overlays"}]
export default function StreamConfigPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">⚙️ Stream Config</h1>
      <div className="flex gap-1 overflow-x-auto pb-1 flex-wrap">{TABS.map(t => <Link key={t.id} href={t.h}><button className="px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap bg-white/5 text-muted-foreground hover:bg-white/10">{t.l}</button></Link>)}</div>
      <div className="space-y-1">{[{l:"🔑 Stream Key",v:"Configurada",h:"/dashboard/stream-config/stream-key"},{l:"🌐 Servidor",v:"Luanda (12ms)",h:"/dashboard/stream-config/ingest"},{l:"📺 Qualidade",v:"720p / 2500kbps",h:"/dashboard/stream-config/qualidade"},{l:"⏱️ Delay",v:"Sem delay",h:"/dashboard/stream-config/delay"},{l:"📹 VOD",v:"Gravar sempre",h:"/dashboard/stream-config/vod-settings"},{l:"✂️ Clips",v:"Viewers: qualquer",h:"/dashboard/stream-config/clip-settings"},{l:"⚔️ Raid",v:"Aceitar todos",h:"/dashboard/stream-config/raid-settings"},{l:"🔔 Alertas",v:"4/5 activos",h:"/dashboard/stream-config/alertas"},{l:"🎨 Overlays",v:"4 overlays",h:"/dashboard/stream-config/overlays"}].map(s => <Link key={s.l} href={s.h}><div className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-xs font-bold">{s.l}</span><span className="text-[9px] text-muted-foreground">{s.v}</span></div></Link>)}</div>
    </div>
  )
}
