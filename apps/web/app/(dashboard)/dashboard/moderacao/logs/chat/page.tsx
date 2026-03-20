"use client"
import { useState } from "react"
import { ModLogItem } from "@/components/moderation/moderation-components"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
const TABS = [{id:"chat",l:"Chat"},{id:"bans",l:"Bans"},{id:"timeouts",l:"Timeouts"},{id:"deletados",l:"Deletados"},{id:"raids",l:"Raids"},{id:"mods",l:"Moderadores"}]
export default function LogsChatPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📋 Logs</h1>
      <div className="flex gap-1 overflow-x-auto">{TABS.map(t => <Link key={t.id} href={`/dashboard/moderacao/logs/${t.id}`}><button className={`px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "chat" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filtrar por utilizador..." className="bg-white/5 pl-8 h-8 text-xs" /></div>
      <div className="space-y-0"><ModLogItem time="21:34" user="@viewer1" content="boa stream!" type="normal" /><ModLogItem time="21:35" user="@viewer2" content="[palavra bloqueada]" type="automod" /><ModLogItem time="21:36" user="@mod1" content="Timeout a @viewer3 (10min)" type="mod" /><ModLogItem time="21:37" user="@viewer4" content="alguém tem link?" type="normal" /><ModLogItem time="21:38" user="@viewer5" content="bit.ly/xxx compra aqui" type="automod" /><ModLogItem time="21:39" user="@mod2" content="Eliminou msg de @viewer5" type="deleted" /></div>
    </div>
  )
}
