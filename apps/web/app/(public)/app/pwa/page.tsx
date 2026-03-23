import { PwaInstallButton } from "@/components/app-download/pwa-install-button"
import Link from "next/link"
export default function PwaHubPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">🌐 Progressive Web App (PWA)</h1>
      <p className="text-xs text-muted-foreground">A forma mais rápida de ter o Kwanza Stream instalado.</p>
      <div className="space-y-1">{["Sem Play Store ou App Store", "Instala em segundos", "Funciona como app nativa", "Actualiza automaticamente", "Ocupa menos espaço", "Funciona offline (parcialmente)"].map(v => <div key={v} className="flex items-center gap-2 text-[10px]"><span className="text-green-400">✅</span>{v}</div>)}</div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><p className="text-[10px] font-semibold mb-1">Compatível com:</p><p className="text-[9px] text-muted-foreground">📱 Android (Chrome, Samsung Internet, Firefox)</p><p className="text-[9px] text-muted-foreground">🍎 iPhone/iPad (Safari iOS 16.4+)</p><p className="text-[9px] text-muted-foreground">💻 Windows/Mac (Chrome, Edge)</p></div>
      <PwaInstallButton />
      <Link href="/app/pwa/instalar" className="block text-center text-[10px] text-primary hover:underline">Ver guia completo de instalação →</Link>
    </div>
  )
}
