"use client"
export default function DropAnalyticsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Analytics do Drop</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Claims", v: "234" }, { l: "Viewers", v: "12.400" }, { l: "Horas assistidas", v: "4.500h" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
