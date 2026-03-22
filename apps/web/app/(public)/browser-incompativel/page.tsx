"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function BrowserIncompativelPage() { return (
  <ErrorPageLayout icon="🌐" title="Browser Não Suportado" description="O teu browser não suporta streaming de vídeo HLS. Actualiza para um browser moderno para a melhor experiência.">
    <div className="space-y-2 text-left px-4">{[{ name: "Chrome 80+", rec: true, url: "https://google.com/chrome" }, { name: "Firefox 75+", rec: false, url: "https://firefox.com" }, { name: "Safari 14+ (iOS)", rec: false, url: "#" }, { name: "Samsung Internet 12+", rec: false, url: "#" }].map(b => <a key={b.name} href={b.url} className="flex items-center justify-between p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"><span className="text-xs">{b.name}</span>{b.rec && <span className="text-[9px] text-primary">Recomendado</span>}</a>)}</div>
  </ErrorPageLayout>
) }
