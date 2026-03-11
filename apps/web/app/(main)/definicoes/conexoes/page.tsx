"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor, Globe, Clock } from "lucide-react"

export default function DispositivosPage() {
  return (
    <div className="space-y-6 max-w-lg">
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base flex items-center gap-2"><Smartphone className="w-4 h-4" />Sessões activas</CardTitle><CardDescription>Dispositivos onde a tua conta está com sessão aberta</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <Monitor className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1"><div className="flex items-center gap-2"><p className="text-sm font-medium">Este dispositivo</p><Badge className="bg-green-500/10 text-green-500 text-[10px] h-4">Activa</Badge></div><p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Globe className="w-3 h-3" />Luanda, Angola · Windows</p><p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Agora</p></div>
          </div>
          <div className="text-center py-4"><p className="text-xs text-muted-foreground">Não há outras sessões activas</p></div>
        </CardContent>
      </Card>
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Segurança de sessão</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Termina todas as sessões excepto a actual. Útil se suspeitares de acesso não autorizado.</p>
          <Button variant="outline" className="w-full text-xs">Terminar todas as outras sessões</Button>
        </CardContent>
      </Card>
    </div>
  )
}
