import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s — Kwanza Stream", default: "Autenticação — Kwanza Stream" },
  description: "Entra ou cria a tua conta no Kwanza Stream. A plataforma de streaming de Angola.",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
