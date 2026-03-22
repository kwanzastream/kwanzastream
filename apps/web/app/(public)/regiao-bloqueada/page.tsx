"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function RegiaoBloqueadaPage() { return (
  <ErrorPageLayout icon="🌍" title="Região Não Suportada" description="O Kwanza Stream está actualmente disponível principalmente em Angola e para a diáspora angolana. Podes assistir streams mas algumas funcionalidades (pagamentos, Salos) podem estar limitadas na tua região." primaryAction={{ label: "Continuar →", href: "/feed" }} secondaryAction={{ label: "Saber mais", href: "/faq/geral" }} />
) }
