import { IosWaitlistForm } from "@/components/app-download/ios-waitlist-form"
import Link from "next/link"
export default function IosHubPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">🍎 Kwanza Stream para iOS</h1>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20"><p className="text-xs text-yellow-400">Estado: Em desenvolvimento</p><p className="text-[10px] text-muted-foreground mt-1">Lançamento previsto: Q3 2026</p></div>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs font-semibold">🌐 Enquanto isso: Instalar como PWA no Safari</p><p className="text-[10px] text-muted-foreground mt-1">Funciona em iPhone e iPad. Experiência nativa sem App Store.</p><Link href="/app/ios/instalar" className="inline-block mt-2 px-4 py-2 rounded-lg bg-primary text-white text-[10px]">Ver como instalar →</Link></div>
      <IosWaitlistForm />
    </div>
  )
}
