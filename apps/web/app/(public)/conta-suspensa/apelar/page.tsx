"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
import { AppealForm } from "@/components/errors/appeal-form"
export default function ContaSuspensaApelarPage() { return (
  <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div className="max-w-md w-full space-y-6">
      <div className="text-center"><h1 className="text-xl font-bold">⏸️ Apelar Suspensão</h1><p className="text-xs text-muted-foreground mt-2">Preenche o formulário abaixo. Resposta em 24-48h.</p></div>
      <AppealForm type="suspensao" reason="Violação das Diretrizes — Spam no chat" date="20 Mar 2026" duration="7 dias" />
    </div>
  </div>
) }
