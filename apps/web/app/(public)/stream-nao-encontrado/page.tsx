"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function StreamNaoEncontradoPage() { return (
  <ErrorPageLayout icon="📺" title="Canal ou Stream Não Encontrado" description="O canal que procuras pode ter mudado de username, ter sido suspenso, ou não existir." primaryAction={{ label: "🔍 Pesquisar canais", href: "/explore" }} secondaryAction={{ label: "Explorar streams", href: "/feed" }} />
) }
