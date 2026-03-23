import { InstallStep } from "@/components/app-download/install-step"
import Link from "next/link"
export default function AndroidInstalarPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Instalar no Android</h1>
      <div className="space-y-1"><h2 className="text-sm font-semibold">Método 1 — Chrome (recomendado)</h2><InstallStep number={1} title="Abre kwanzastream.ao no Chrome" /><InstallStep number={2} title='Toca nos 3 pontos (⋮) no canto superior direito' /><InstallStep number={3} title='"Adicionar ao ecrã inicial"' /><InstallStep number={4} title='Confirma "Adicionar"' highlight /><InstallStep number={5} title="✅ O ícone aparece no teu ecrã!" /></div>
      <div className="space-y-1"><h2 className="text-sm font-semibold">Método 2 — Samsung Internet</h2><InstallStep number={1} title="Abre kwanzastream.ao no Samsung Internet" /><InstallStep number={2} title='Toca no ícone de menu (☰)' /><InstallStep number={3} title='"Adicionar página ao" → "Ecrã inicial"' /></div>
      <div className="space-y-1"><h2 className="text-sm font-semibold">Método 3 — APK directo</h2><InstallStep number={1} title="Descarrega o APK" /><InstallStep number={2} title="Definições → Segurança → Fontes desconhecidas → Activar" /><InstallStep number={3} title="Abre o ficheiro APK descarregado" /><InstallStep number={4} title="Segue as instruções de instalação" /></div>
      <Link href="/suporte" className="block text-center text-[10px] text-muted-foreground hover:text-primary">Precisa de ajuda? Contactar suporte →</Link>
    </div>
  )
}
