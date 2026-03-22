"use client"
import Link from "next/link"
export default function UniversitariosPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><span className="text-4xl">🎓</span><h1 className="text-2xl font-bold">Para Universitários</h1>
  <p className="text-sm text-muted-foreground">Criação de conteúdo académico e profissional para estudantes angolanos</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs">→ Canal de universidade na plataforma</p><p className="text-xs">→ Streaming de aulas e conferências</p><p className="text-xs">→ Portfolio de conteúdo para carreira</p></div>
  <Link href="/educacao/universitarios/programa" className="block px-4 py-2 rounded-lg bg-primary text-white text-xs text-center w-fit">Ver programa completo</Link>
</div>) }
