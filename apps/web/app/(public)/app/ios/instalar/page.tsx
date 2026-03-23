import { InstallStep } from "@/components/app-download/install-step"
export default function IosInstalarPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Instalar no iPhone / iPad</h1>
      <InstallStep number={1} title="Abre kwanzastream.ao no Safari" description="Obrigatório — não funciona noutros browsers no iOS" />
      <InstallStep number={2} title="Toca no ícone de partilha (□↑)" description="Na barra inferior do Safari" />
      <InstallStep number={3} title='"Adicionar ao ecrã de início"' description="Faz scroll para baixo para encontrar esta opção" />
      <InstallStep number={4} title='Confirma tocando em "Adicionar"' highlight />
      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20"><p className="text-xs text-green-400">✅ O ícone do Kwanza Stream aparece no teu ecrã!</p></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1"><p className="text-[10px] font-semibold">Nota sobre iOS:</p><p className="text-[9px] text-muted-foreground">→ Notificações push têm limitações no iOS</p><p className="text-[9px] text-muted-foreground">→ Requer Safari actualizado (iOS 16.4+)</p></div>
    </div>
  )
}
