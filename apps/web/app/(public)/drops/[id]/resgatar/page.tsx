"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gift, Copy, MessageCircle, Check, Calendar } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function DropResgatarPage() {
  const { id } = useParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const code = "KWANZA-UNITEL-X7K9"

  const copyCode = () => { navigator.clipboard.writeText(code); setCopied(true); toast.success("Código copiado!"); setTimeout(() => setCopied(false), 3000) }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href={`/drops/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Resgatar Drop</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center space-y-3">
        <p className="text-3xl">🎉</p>
        <h2 className="text-lg font-black">Parabéns! Ganhaste um Drop!</h2>
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto"><Gift className="w-8 h-8 text-primary" /></div>
        <p className="text-lg font-bold">500MB de dados Unitel</p>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <p className="text-xs font-bold">Como resgatar:</p>
        <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
          <li>Código: <span className="font-mono text-primary font-bold">{code}</span></li>
          <li>Acede a *123# ou à App Unitel</li>
          <li>Introduz o código na secção "Recargas"</li>
          <li>Os dados são creditados em 24h</li>
        </ol>
      </div>
      <div className="flex gap-3">
        <Button className="flex-1 gap-1" onClick={copyCode}>{copied ? <><Check className="w-4 h-4" />Copiado</> : <><Copy className="w-4 h-4" />Copiar código</>}</Button>
        <Button variant="outline" className="flex-1 gap-1" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Ganhei 500MB de dados com Kwanza Stream! 🎉 Código: ${code}`)}`, "_blank")}><MessageCircle className="w-4 h-4" />WhatsApp</Button>
      </div>
      <p className="text-[9px] text-muted-foreground text-center flex items-center justify-center gap-1"><Calendar className="w-3 h-3" />Válido até: 31 Março 2026</p>
    </div>
  )
}
