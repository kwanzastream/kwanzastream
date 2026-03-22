"use client"
export default function ProgramaEscolasPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Programa para Escolas</h1>
  <div className="space-y-3">{[{ title: "Módulo 1: Introdução ao Streaming", desc: "O que é streaming, como funciona, segurança online" }, { title: "Módulo 2: Criação de Conteúdo", desc: "Câmara, microfone, iluminação, OBS" }, { title: "Módulo 3: Canal Escolar", desc: "Criar e gerir um canal de escola" }, { title: "Módulo 4: Eventos ao Vivo", desc: "Transmitir competições, festivais, formatura" }].map((m,i) => (
    <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-sm font-semibold">{m.title}</p><p className="text-[10px] text-muted-foreground">{m.desc}</p></div>
  ))}</div></div>) }
