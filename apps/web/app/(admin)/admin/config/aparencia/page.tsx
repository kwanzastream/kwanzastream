"use client"
export default function ConfigAparenciaPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Aparência</h1>
  <div className="space-y-3">{[{ l: "Tema padrão", v: "Escuro" }, { l: "Cor primária", v: "#CE1126" }, { l: "Logo", v: "kwanza-logo.svg" }, { l: "Favicon", v: "favicon.ico" }, { l: "Banner homepage", v: "Activo" }].map(s => <div key={s.l} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><span className="text-xs">{s.l}</span><span className="text-xs text-muted-foreground">{s.v}</span></div>)}</div></div>) }
