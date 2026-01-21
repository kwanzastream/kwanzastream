"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("[v0] Global Error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 angola-pattern text-center">
      <div className="max-w-md w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative">
          <div className="absolute -inset-8 bg-destructive/20 rounded-full blur-3xl" />
          <div className="relative w-24 h-24 bg-destructive rounded-2xl rotate-3 flex items-center justify-center mx-auto shadow-2xl shadow-destructive/30">
            <AlertTriangle className="w-12 h-12 text-white -rotate-3" strokeWidth={2.5} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tighter">Algo Correu Mal</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Não és tu, somos nós. A equipa já foi notificada e estamos a trabalhar para resolver este problema.
          </p>
          <div className="p-2 rounded-lg bg-destructive/5 border border-destructive/10 inline-block">
            <code className="text-[10px] text-destructive font-mono">{error.digest || "ERROR_INTERNAL_500"}</code>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="h-12 font-bold w-full" onClick={() => reset()}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Tentar Novamente
          </Button>
          <Button asChild variant="ghost" className="h-12 text-muted-foreground w-full">
            <Link href="/support">
              <MessageSquare className="mr-2 h-4 w-4" /> Reportar Problema
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Precisas de ajuda urgente? Contacta <span className="text-foreground font-bold">suporte@kwanzastream.ao</span>
        </p>
      </div>
    </div>
  )
}
