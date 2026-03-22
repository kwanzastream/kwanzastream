"use client"
import { AppealForm } from "@/components/errors/appeal-form"
export default function ContaBanidaApelarPage() { return (
  <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div className="max-w-md w-full space-y-6">
      <div className="text-center"><h1 className="text-xl font-bold">🚫 Apelar Ban</h1><p className="text-xs text-muted-foreground mt-2">Este é o teu único apelo. Certifica-te que é completo.</p></div>
      <AppealForm type="ban" reason="Violação grave das Diretrizes de Comunidade" date="20 Mar 2026" />
    </div>
  </div>
) }
