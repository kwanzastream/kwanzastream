"use client"
import Link from "next/link"
const TABS = [{id:"settings",l:"Settings",h:"/dashboard/moderacao/settings"},{id:"automod",l:"AutoMod",h:"/dashboard/moderacao/automod"},{id:"logs",l:"Logs",h:"/dashboard/moderacao/logs"},{id:"reports",l:"Reports",h:"/dashboard/moderacao/reports"},{id:"protection",l:"Protecção",h:"/dashboard/moderacao/channel-protection"},{id:"claims",l:"Claims",h:"/dashboard/moderacao/claims/pendentes"},{id:"appeals",l:"Appeals",h:"/dashboard/moderacao/appeals/pendentes"}]
export default function SettingsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">🛡️ Moderação</h1>
      <div className="flex gap-1 overflow-x-auto pb-1">{TABS.map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "settings" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{t.l}</button></Link>)}</div>
      <div className="space-y-1">{[{l:"Chat",v:"🟢 Normal",h:"/dashboard/moderacao/settings/permissoes-chat"},{l:"AutoMod",v:"✅ Nível 2",h:"/dashboard/moderacao/automod"},{l:"Slow mode",v:"❌ Inactivo",h:"/dashboard/moderacao/settings/slow-mode"},{l:"Followers-only",v:"❌ Inactivo",h:"/dashboard/moderacao/settings/followers-only"},{l:"Sub-only",v:"❌ Inactivo",h:"/dashboard/moderacao/settings/sub-only"},{l:"Links",v:"🔒 Bloqueados",h:"/dashboard/moderacao/automod/links"},{l:"Verificações",v:"✅ Email",h:"/dashboard/moderacao/settings/verificacoes"}].map(s => <Link key={s.l} href={s.h}><div className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-primary/20"><span className="text-xs font-bold">{s.l}</span><span className="text-[9px]">{s.v}</span></div></Link>)}</div>
    </div>
  )
}
