"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wrench, Bell, Instagram, Twitter, Facebook } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 angola-pattern text-center">
      <div className="max-w-lg w-full space-y-12 animate-in fade-in zoom-in-95 duration-700">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl">K</div>
            <span className="font-bold text-2xl tracking-tighter">
              KWANZA <span className="text-secondary">STREAM</span>
            </span>
          </div>
        </div>

        <div className="space-y-10">
          <div className="relative">
            <div className="absolute -inset-12 bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative w-20 h-20 bg-white/5 border border-white/10 rounded-2xl rotate-6 flex items-center justify-center mx-auto shadow-2xl">
              <Wrench className="w-10 h-10 text-primary -rotate-6 animate-bounce" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Estamos em Manutenção</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Estamos a melhorar a plataforma para te oferecer uma experiência ainda melhor. Voltamos em breve!
            </p>
          </div>

          <div className="space-y-4 max-w-xs mx-auto">
            <div className="flex justify-between text-xs font-bold text-primary uppercase">
              <span>Progresso</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-[10px] text-muted-foreground">Tempo estimado de retorno: 2 horas</p>
          </div>
        </div>

        {/* Notify Me */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
          <h3 className="font-bold flex items-center justify-center gap-2">
            <Bell className="h-4 w-4 text-secondary" /> Notifica-me quando voltar
          </h3>
          <div className="flex gap-2">
            <Input placeholder="Teu email" className="bg-white/5 border-white/10 h-11" />
            <Button className="font-bold h-11">Enviar</Button>
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Segue-nos para actualizações em tempo real</p>
          <div className="flex items-center justify-center gap-6">
            <button className="text-muted-foreground hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </button>
            <button className="text-muted-foreground hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </button>
            <button className="text-muted-foreground hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
