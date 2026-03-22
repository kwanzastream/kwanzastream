"use client"
import { useParams } from "next/navigation"
export default function TemplateDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Template: {id}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><p className="text-xs"><strong>Assunto:</strong> Bem-vindo ao Kwanza Stream!</p><textarea defaultValue="Olá {{username}},\n\nBem-vindo ao Kwanza Stream!" className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[120px]" /></div></div>) }
