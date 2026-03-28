"use client"

import Link from "next/link"

export default function ErroServidorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
      <div className="text-7xl font-black bg-gradient-to-b from-red-500/80 to-red-500/20 bg-clip-text text-transparent">500</div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Erro interno</h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Algo correu mal do nosso lado. A equipa já foi notificada. Tenta novamente em alguns minutos.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => window.location.reload()} className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          Tentar novamente
        </button>
        <Link href="/" className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors">
          Ir para início
        </Link>
      </div>
    </div>
  )
}
