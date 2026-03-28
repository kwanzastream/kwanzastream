import type { Metadata } from "next"
export const metadata: Metadata = { title: "App Android | Kwanza Stream", description: "Descarrega o Kwanza Stream para Android. Streaming ao vivo na palma da mao." }

import { PwaInstallButton } from "@/components/app-download/pwa-install-button"
import Link from "next/link"
export default function AndroidHubPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">🤖 Kwanza Stream para Android</h1>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-muted-foreground"><p>Versão actual: <span className="text-foreground">1.0.0</span></p><p>Compatível com: <span className="text-foreground">Android 8.0+</span></p><p>Tamanho: <span className="text-foreground">~45MB</span></p></div>
      <div className="space-y-3">
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs font-semibold">⭐ Recomendado: Instalar como PWA</p><p className="text-[10px] text-muted-foreground mt-1">Não precisa da Play Store. Funciona offline. Actualiza automaticamente.</p><div className="mt-3"><PwaInstallButton /></div></div>
        <div className="p-4 rounded-xl border border-white/10"><p className="text-xs font-semibold">📦 Descarregar APK directamente</p><p className="text-[10px] text-muted-foreground mt-1">Para dispositivos sem Google Play. Instalação manual.</p><a href="https://cdn.kwanzastream.ao/releases/kwanzastream-v1.0.0.apk" className="inline-block mt-2 px-4 py-2 rounded-lg border border-white/10 text-[10px] hover:bg-white/5">Descarregar APK v1.0.0</a></div>
        <div className="p-4 rounded-xl border border-white/10"><p className="text-xs font-semibold">🏪 Google Play Store</p><p className="text-[10px] text-muted-foreground mt-1">Em análise — disponível em breve.</p></div>
      </div>
      <Link href="/app/android/instalar" className="block text-center text-[10px] text-primary hover:underline">Ver guia de instalação →</Link>
    </div>
  )
}
