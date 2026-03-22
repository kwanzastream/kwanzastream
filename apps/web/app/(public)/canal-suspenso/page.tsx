"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function CanalSuspensoPage() { return (
  <ErrorPageLayout icon="🚫" title="Canal Suspenso" description="Este canal está temporariamente suspenso por violação das Diretrizes de Comunidade." primaryAction={{ label: "Explorar outros canais →", href: "/explore" }} secondaryAction={{ label: "Ler Diretrizes", href: "/diretrizes-comunidade" }} />
) }
