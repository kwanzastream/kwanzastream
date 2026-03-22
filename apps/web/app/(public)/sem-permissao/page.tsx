"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function SemPermissaoPage() { return (
  <ErrorPageLayout icon="🔒" title="Sem Permissão" description="Não tens permissão para realizar esta acção. Pode ser necessário: conta verificada, subscrição activa, ou Programa Afiliado." primaryAction={{ label: "O que preciso fazer?", href: "/faq/conta" }} secondaryAction={{ label: "Contactar suporte", href: "/suporte" }} />
) }
