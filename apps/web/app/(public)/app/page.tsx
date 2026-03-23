import { PlatformCard } from "@/components/app-download/platform-card"
import { PwaInstallButton } from "@/components/app-download/pwa-install-button"
import Link from "next/link"
export default function AppHubPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="text-center"><h1 className="text-xl font-black">📱 Kwanza Stream App</h1><p className="text-xs text-muted-foreground">Streaming angolano em qualquer lugar</p></div>
      <div className="grid grid-cols-2 gap-3">
        <PlatformCard icon="🤖" name="Android" status="Disponível" href="/app/android" />
        <PlatformCard icon="🍎" name="iOS" status="Em breve" href="/app/ios" />
        <PlatformCard icon="💻" name="Desktop" status="Windows/Mac" href="/app/desktop" />
        <PlatformCard icon="🌐" name="PWA" status="Instalar agora" href="/app/pwa" recommended />
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3"><p className="text-xs font-semibold">Recomendado para Angola:</p><p className="text-[10px] text-muted-foreground">📱 PWA — instala já, sem Play Store. Funciona em qualquer browser. Ocupa menos espaço. Actualiza sozinha.</p><PwaInstallButton /></div>
      <Link href="/app/novidades" className="block text-center text-[10px] text-muted-foreground hover:text-primary">Ver novidades →</Link>
    </div>
  )
}
