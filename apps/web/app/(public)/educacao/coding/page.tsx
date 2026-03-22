"use client"
import Link from "next/link"
export default function CodingPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><span className="text-4xl">💻</span><h1 className="text-2xl font-bold">Coding Workshops</h1>
  <p className="text-sm text-muted-foreground">Aprende a usar a API do Kwanza Stream e a construir apps, bots e overlays</p>
  <Link href="/educacao/coding/workshops" className="block px-4 py-2 rounded-lg bg-primary text-white text-xs text-center w-fit">Ver workshops disponíveis</Link>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs text-muted-foreground">Formato: Online via Kwanza Stream · Gratuito</p><p className="text-xs text-muted-foreground">Linguagem: JavaScript/Node.js + HTML/CSS</p></div>
</div>) }
