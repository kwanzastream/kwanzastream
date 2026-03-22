"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
export default function KycNecessarioPage() { return (
  <ErrorPageLayout icon="🪪" title="Verificação de Identidade Necessária" description="Para levantar fundos ou monetizar o teu canal, precisas de verificar a tua identidade." primaryAction={{ label: "Iniciar verificação KYC →", href: "/kyc/verificar" }} secondaryAction={{ label: "Saber mais", href: "/suporte/artigo/verificacao-kyc" }}>
    <div className="space-y-2 text-left px-4"><p className="text-[10px] text-muted-foreground">O que precisas:</p><ul className="text-[10px] text-muted-foreground space-y-1"><li>→ Bilhete de Identidade angolano</li><li>→ Selfie com o BI</li></ul><p className="text-[10px] text-muted-foreground mt-2">Processo rápido · Aprovação em 24-48h</p></div>
  </ErrorPageLayout>
) }
