"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function AppDesactualizadaPage() { return (
  <ErrorPageLayout icon="🔄" title="App Desactualizada" description="A tua versão do Kwanza Stream está desactualizada. Actualiza para a versão mais recente para continuar a usar todas as funcionalidades.">
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1"><p className="text-[10px] text-muted-foreground">Versão actual: <span className="text-foreground font-mono">1.0.2</span></p><p className="text-[10px] text-muted-foreground">Versão instalada: <span className="text-foreground font-mono">1.0.0</span></p></div>
    <div className="flex items-center justify-center gap-3"><a href="#" className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold">Actualizar agora →</a></div>
  </ErrorPageLayout>
) }
