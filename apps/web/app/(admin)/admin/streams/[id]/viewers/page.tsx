"use client"
export default function StreamViewersPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Viewers do Stream</h1>
  <p className="text-xs text-muted-foreground">234 viewers activos</p>
  <div className="space-y-1">{[1,2,3,4,5].map(i => <div key={i} className="p-2 rounded-lg border border-white/5 text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /><span>@viewer-{i}</span><span className="text-muted-foreground ml-auto">há {i*3}min</span></div>)}</div></div>) }
