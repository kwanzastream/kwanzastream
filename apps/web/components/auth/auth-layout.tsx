import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  showBackLink?: boolean
  backHref?: string
  backLabel?: string
}

export function AuthLayout({ children, showBackLink, backHref = "/entrar", backLabel = "Voltar" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-4 py-8">
      {/* Angola flag gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full bg-gradient-to-r from-[#CE1126] via-[#000000] to-[#F9D616]" />
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-primary">Kwanza</span>{" "}
              <span className="text-foreground">Stream</span>
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">A plataforma de streaming de Angola 🇦🇴</p>
        </div>

        {children}

        {showBackLink && (
          <div className="mt-6 text-center">
            <Link href={backHref} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← {backLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
