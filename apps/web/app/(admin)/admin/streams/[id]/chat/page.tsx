"use client"
export default function StreamChatPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Chat do Stream</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1 max-h-80 overflow-y-auto">{[{ user: "viewer1", msg: "Bué fixe!", time: "14:23" }, { user: "viewer2", msg: "Golo!!", time: "14:24" }, { user: "mod1", msg: "[MOD] timeout @spammer", time: "14:25" }].map((m,i) => <p key={i} className="text-xs"><span className="text-muted-foreground">[{m.time}]</span> <strong>@{m.user}</strong>: {m.msg}</p>)}</div></div>) }
