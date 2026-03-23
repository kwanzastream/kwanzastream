import { InstallStep } from "@/components/app-download/install-step"
export default function MacPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">🍎 Kwanza Stream no Mac</h1>
      <div><h2 className="text-sm font-semibold mb-2">Método recomendado — PWA no Chrome</h2><InstallStep number={1} title="Abre kwanzastream.ao no Chrome" /><InstallStep number={2} title='Menu → "Instalar Kwanza Stream..." ou ícone ⊕ na barra' /><InstallStep number={3} title='Confirma "Instalar"' highlight /></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><p className="text-xs font-semibold">Safari no Mac</p><p className="text-[10px] text-muted-foreground mt-1">Safari no macOS Sonoma (14+) suporta PWA. Ficheiro → "Adicionar ao Dock".</p></div>
      <p className="text-[9px] text-muted-foreground text-center">App nativa Mac: planeada para 2027</p>
    </div>
  )
}
