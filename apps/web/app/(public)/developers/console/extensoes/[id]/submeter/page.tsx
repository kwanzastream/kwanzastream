"use client"
import { useParams } from "next/navigation"
import { ChevronLeft, Upload, CheckCircle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubmeterPage() {
  const { id } = useParams()
  const reqs = [{ label: "Extensão funciona no sandbox", done: false }, { label: "Screenshots adicionados", done: false }, { label: "Descrição e metadados preenchidos", done: false }, { label: "Testada em 3+ browsers", done: false }]
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/extensoes/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Extensão</Link>
      <Upload className="w-8 h-8 text-primary" />
      <h1 className="text-xl font-bold">Submeter para Review</h1>
      <p className="text-xs text-muted-foreground">A equipa revê em 3-5 dias úteis.</p>
      <div className="space-y-2">{reqs.map((r, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">{r.done ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Circle className="w-4 h-4" />}{r.label}</div>
      ))}</div>
      <Button disabled className="w-full">Submeter</Button>
    </div>
  )
}
