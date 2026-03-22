"use client"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"
import { LegalSection } from "@/components/legal/legal-section"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ContestarPage() { return (
  <LegalPageLayout title="Contestar um Claim" lastUpdated="1 Maio 2026">
    <LegalSection id="quando" title="Quando contestar"><p>Podes contestar um claim se:</p><ul className="list-disc ml-4 space-y-1"><li>Tens licença para usar o conteúdo</li><li>O conteúdo é teu</li><li>O uso se qualifica como fair use</li><li>O claim foi feito por engano</li></ul></LegalSection>
    <LegalSection id="formulario" title="Formulário de contestação">
      <div className="space-y-3 mt-2">
        <input placeholder="URL do conteúdo com claim" className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" />
        <textarea placeholder="Explica porque contestas o claim..." className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[100px]" />
        <label className="flex items-start gap-2 text-[10px]"><input type="checkbox" className="mt-0.5" /><span>Declaro sob pena de perjúrio que tenho o direito de usar este conteúdo.</span></label>
        <Button onClick={() => toast.success("Contestação enviada! Resposta em 14 dias.")} className="text-xs">Submeter contestação</Button>
      </div>
    </LegalSection>
  </LegalPageLayout>
) }
