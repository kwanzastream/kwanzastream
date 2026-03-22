"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function ConteudoRemovidoPage() { return (
  <ErrorPageLayout icon="🗑️" title="Conteúdo Removido" description="Este conteúdo foi removido. Razões possíveis: violação das Diretrizes, pedido do próprio criador, ou reclamação de copyright." primaryAction={{ label: "Ver conteúdo similar →", href: "/explore" }} secondaryAction={{ label: "Contactar suporte", href: "/suporte" }} />
) }
