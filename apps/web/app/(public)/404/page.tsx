import Link from "next/link"

export default function NaoEncontradoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
      <div className="text-7xl font-black bg-gradient-to-b from-primary/80 to-primary/20 bg-clip-text text-transparent">404</div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Página não encontrada</h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          A página que procuras não existe ou foi movida. Verifica o endereço ou volta ao início.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          Ir para início
        </Link>
        <Link href="/explorar" className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors">
          Explorar
        </Link>
      </div>
    </div>
  )
}
