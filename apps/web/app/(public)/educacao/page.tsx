"use client"
import Link from "next/link"
import { BookOpen, GraduationCap, Code } from "lucide-react"
export default function EducacaoPage() {
  const sections = [
    { icon: BookOpen, title: "Para Escolas", desc: "Programa para ensino secundário", href: "/educacao/escolas" },
    { icon: GraduationCap, title: "Para Universitários", desc: "Criação de conteúdo académico", href: "/educacao/universitarios" },
    { icon: Code, title: "Coding Workshops", desc: "Aprende a construir sobre a plataforma", href: "/educacao/coding" },
  ]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-2xl font-bold">🎓 Kwanza Stream para Educação</h1>
    <p className="text-sm text-muted-foreground">Formação, workshops e programas para criadores angolanos de todas as idades</p>
    <div className="grid grid-cols-3 gap-3">{sections.map((s,i) => (
      <Link key={i} href={s.href} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all text-center space-y-2">
        <s.icon className="w-8 h-8 text-primary mx-auto" /><p className="text-sm font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.desc}</p>
      </Link>
    ))}</div>
  </div>)
}
