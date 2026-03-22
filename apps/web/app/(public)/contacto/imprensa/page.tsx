"use client"
import Link from "next/link"
export default function ContactoImprensaPage() { return (
  <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">📰 Imprensa & Media</h1>
    <div className="space-y-2 text-xs text-muted-foreground"><p>Para pedidos de entrevista, comunicados e informação:</p><p className="font-mono text-foreground">imprensa@kwanzastream.ao</p><p>Tempo de resposta: 24-48h em dias úteis</p></div>
    <div className="p-4 rounded-xl border border-white/10"><p className="text-xs">Kit de imprensa disponível em <Link href="/imprensa/kit" className="text-primary hover:underline">/imprensa/kit</Link></p></div>
  </div>
) }
