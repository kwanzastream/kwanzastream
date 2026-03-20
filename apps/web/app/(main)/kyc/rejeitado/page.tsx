"use client"
import { AlertTriangle, RefreshCw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function KYCRejeitadoPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
      <h2 className="text-xl font-bold">KYC Rejeitado</h2>
      <p className="text-sm text-muted-foreground">A verificação de identidade não foi aprovada.</p>
      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-left space-y-2"><p className="text-xs font-bold text-red-400">Possíveis motivos:</p><ul className="text-[10px] text-muted-foreground space-y-1"><li>• Documento ilegível ou com má qualidade</li><li>• Selfie não corresponde ao documento</li><li>• Documento expirado</li><li>• Informações inconsistentes</li></ul></div>
      <div className="flex gap-3 justify-center"><Link href="/kyc/verificar"><Button className="gap-1"><RefreshCw className="w-3 h-3" />Tentar novamente</Button></Link><Link href="/suporte"><Button variant="outline" className="gap-1"><MessageCircle className="w-3 h-3" />Contactar suporte</Button></Link></div>
    </div>
  )
}
