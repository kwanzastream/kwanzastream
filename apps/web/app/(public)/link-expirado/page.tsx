"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function LinkExpiradoPage() { return (
  <ErrorPageLayout icon="⏰" title="Link Expirado" description="Este link já não é válido. Links de verificação, reset de password e convites expiram após 24 horas por segurança." primaryAction={{ label: "Pedir novo link", href: "/auth/esqueci-password" }} secondaryAction={{ label: "Ir para o início", href: "/" }} />
) }
