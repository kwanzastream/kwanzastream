import { InstallStep } from "@/components/app-download/install-step"
export default function WindowsPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">💻 Kwanza Stream no Windows</h1>
      <div><h2 className="text-sm font-semibold mb-2">Método recomendado — PWA no Chrome ou Edge</h2><InstallStep number={1} title="Abre kwanzastream.ao no Chrome" /><InstallStep number={2} title='Na barra de endereço, clica em ⊕ "Instalar Kwanza Stream"' /><InstallStep number={3} title='Confirma "Instalar"' highlight /><InstallStep number={4} title="App abre numa janela separada (sem tabs)" /></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><p className="text-xs font-semibold">Alternativa: usar no browser</p><p className="text-[10px] text-muted-foreground mt-1">Sem instalação necessária. Todas as funcionalidades disponíveis.</p></div>
      <p className="text-[9px] text-muted-foreground text-center">App nativa Windows: planeada para 2027</p>
    </div>
  )
}
