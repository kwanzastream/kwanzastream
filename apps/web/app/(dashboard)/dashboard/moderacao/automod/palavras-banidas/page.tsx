"use client"
import { useState } from "react"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function PalavrasBanidasPage() {
  const [words, setWords] = useState(["palavra1","frase ofensiva","termo impróprio"])
  const [newWord, setNewWord] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/automod"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Palavras Banidas</h1></div>
      <div className="flex gap-2"><Input value={newWord} onChange={e => setNewWord(e.target.value)} placeholder="Adicionar palavra/frase..." className="bg-white/5" /><Button size="sm" className="gap-1 shrink-0" onClick={() => { if(newWord) { setWords([...words, newWord]); setNewWord(""); toast.success("Adicionada!") }}}><Plus className="w-3 h-3" /></Button></div>
      <p className="text-[8px] text-muted-foreground">Insensível a maiúsculas. Wildcards: "palavra*" bloqueia "palavrão", "palavras"</p>
      <div className="space-y-1">{words.map(w => <div key={w} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><span className="text-xs font-mono">&ldquo;{w}&rdquo;</span><Button size="sm" variant="ghost" className="text-red-400 h-6" onClick={() => { setWords(words.filter(x => x !== w)); toast.info("Removida") }}><X className="w-3 h-3" /></Button></div>)}</div>
    </div>
  )
}
