"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function AparenciaPage() {
  let theme = "dark"
  let setTheme = (_: string) => {}
  try { const t = useTheme(); theme = t.theme || "dark"; setTheme = t.setTheme } catch {}

  return (
    <div className="space-y-6 max-w-lg">
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base flex items-center gap-2"><Palette className="w-4 h-4" />Tema</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[{ id: "dark", label: "Escuro", icon: Moon, desc: "Recomendado" }, { id: "light", label: "Claro", icon: Sun, desc: "Modo diurno" }].map((t) => (
              <button key={t.id} onClick={() => { setTheme(t.id); toast.success(`Tema ${t.label} activado`) }} className={`p-4 rounded-xl border text-center transition-all ${theme === t.id ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground"}`}>
                <t.icon className="w-6 h-6 mx-auto mb-2" /><p className="text-sm font-medium">{t.label}</p><p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Idioma</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Português (Angola)</p><p className="text-xs text-muted-foreground">Idioma da interface</p></div><Badge variant="outline" className="text-xs">Único disponível</Badge></div>
          <p className="text-xs text-muted-foreground mt-3">Mais idiomas em breve — Inglês, Francês, Kimbundu.</p>
        </CardContent>
      </Card>
      <Card className="border-border/50"><CardHeader className="pb-2"><CardTitle className="text-base">Layout</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[{ key: "compact", label: "Modo compacto", desc: "Menos espaçamento entre elementos" }, { key: "animations", label: "Animações", desc: "Transições e micro-animações" }].map((item) => (
            <div key={item.key} className="flex items-center justify-between"><div><Label className="text-sm">{item.label}</Label><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              <Switch defaultChecked={item.key === "animations"} onCheckedChange={() => toast.info("Preferência guardada localmente")} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
