"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home, Video, User, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 angola-pattern text-center">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in-95 duration-700">
        {/* Animated 404 Visual */}
        <div className="relative inline-block">
          <h1 className="text-[12rem] font-black leading-none tracking-tighter text-white opacity-5">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Illustration Placeholder - Palanca Negra inspired abstract shape */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full bg-linear-to-br from-primary via-secondary to-primary rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                <Search className="w-24 h-24 text-white -rotate-12" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight">Oops! Esta Página Não Existe</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Parece que a Palanca Negra se perdeu no caminho. Vamos ajudar-te a encontrar o que precisas.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="relative group">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Procura o que precisas..."
            className="w-full bg-white/5 border-white/10 pl-10 h-10 rounded-xl"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button asChild className="font-bold h-11">
            <Link href="/feed">
              <Home className="mr-2 h-4 w-4" /> Início
            </Link>
          </Button>
          <Button asChild variant="outline" className="font-bold h-11 border-white/10 bg-transparent">
            <Link href="/explore">
              <Video className="mr-2 h-4 w-4" /> Lives
            </Link>
          </Button>
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-6 text-xs font-medium text-muted-foreground pt-4">
          <Link href="/profile" className="hover:text-primary transition-colors flex items-center gap-1">
            <User className="h-3 w-3" /> Perfil
          </Link>
          <Link href="/help" className="hover:text-primary transition-colors flex items-center gap-1">
            <HelpCircle className="h-3 w-3" /> Ajuda
          </Link>
        </div>
      </div>
    </div>
  )
}
