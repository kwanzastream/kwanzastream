"use client"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Chrome, Globe, Smartphone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const BROWSER_INSTRUCTIONS = [
  { name: "Chrome Android", icon: Chrome, steps: [
    "Toca no cadeado/ícone na barra de endereço",
    "Seleciona \"Permissões do site\" ou \"Definições do site\"",
    "Activa \"Câmara\" e \"Microfone\"",
    "Volta a esta página e carrega \"Tentar novamente\"",
  ]},
  { name: "Firefox", icon: Globe, steps: [
    "Toca no cadeado na barra de endereço",
    "Toca em \"Editar permissões do site\"",
    "Activa câmara e microfone",
    "Recarrega a página",
  ]},
  { name: "Samsung Internet", icon: Smartphone, steps: [
    "Vai a Definições → Sites e downloads → Permissões do site",
    "Encontra kwanzastream.ao na lista",
    "Activa câmara e microfone",
    "Volta e carrega \"Tentar novamente\"",
  ]},
]

export default function GoLiveMobilePermissoesPage() {
  const router = useRouter()
  const handleRetry = () => router.push("/go-live/mobile")

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h1 className="text-xl font-bold">Permissões necessárias</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Para transmitir precisamos de acesso à tua câmara e microfone
          </p>
        </div>

        <div className="space-y-4">
          {BROWSER_INSTRUCTIONS.map((b) => (
            <div key={b.name} className="rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <b.icon className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold">{b.name}</h3>
              </div>
              <ol className="space-y-1.5 text-xs text-muted-foreground">
                {b.steps.map((step, i) => (
                  <li key={i} className="flex gap-2"><span className="text-primary font-bold shrink-0">{i + 1}.</span>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={handleRetry}>Já activei — tentar novamente</Button>
          <Link href="/go-live/audio-only">
            <Button variant="ghost" className="w-full text-xs">Transmitir só áudio (sem câmara)</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
