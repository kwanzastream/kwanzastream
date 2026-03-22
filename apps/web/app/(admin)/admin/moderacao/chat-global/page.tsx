"use client"
export default function ChatGlobalPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Chat Global — Moderação</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs text-muted-foreground">Configura slow mode, emote-only, sub-only, e mensagens filtradas globalmente.</p>
    <div className="grid grid-cols-2 gap-2 mt-3">{[{ l: "Slow mode", v: "Desactivado" }, { l: "Sub-only", v: "Desactivado" }, { l: "Emote-only", v: "Desactivado" }, { l: "Links permitidos", v: "Só verificados" }].map(s => <div key={s.l} className="p-2 rounded-lg border border-white/5"><p className="text-[9px] text-muted-foreground">{s.l}</p><p className="text-[10px]">{s.v}</p></div>)}</div></div></div>) }
