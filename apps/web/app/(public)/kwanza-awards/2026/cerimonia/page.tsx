"use client"
import { Button } from "@/components/ui/button"
import { Tv, Bell, Share2 } from "lucide-react"
import { toast } from "sonner"
export default function CerimoniaPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-center">
  <Tv className="w-12 h-12 text-primary mx-auto" />
  <h1 className="text-2xl font-bold">Cerimónia Kwanza Awards 2026</h1>
  <div className="space-y-1"><p className="text-sm">📅 15 Dezembro 2026 · 20h WAT</p><p className="text-sm">📍 Luanda, Angola</p><p className="text-sm">📺 Transmissão ao vivo no Kwanza Stream</p></div>
  <div className="flex gap-3 justify-center">
    <Button onClick={() => toast.success("Lembrete activado!")} className="gap-1.5"><Bell className="w-3.5 h-3.5" />Lembrar-me</Button>
    <Button variant="outline" onClick={() => { navigator.share?.({ title: "Kwanza Awards 2026", url: window.location.href }) || toast.info("Partilhar: " + window.location.href) }} className="gap-1.5"><Share2 className="w-3.5 h-3.5" />Partilhar</Button>
  </div>
  <div className="p-4 rounded-xl border border-white/10 text-xs text-muted-foreground">Esta página converte-se em página de stream ao vivo na data da cerimónia.</div>
</div>) }
