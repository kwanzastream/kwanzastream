"use client"
export default function AnalyticsViewersPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Analytics — Viewers</h1>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[{ l: "CCU agora", v: "1.234" }, { l: "Peak hoje", v: "3.456" }, { l: "Avg /dia", v: "890" }, { l: "Unique /mês", v: "45.000" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
