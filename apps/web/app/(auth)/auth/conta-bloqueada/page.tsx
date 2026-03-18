import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldX, MessageCircle } from "lucide-react"

export default function ContaBloqueadaPage() {
  return (
    <AuthLayout>
      <Card>
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <ShieldX className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Conta bloqueada</h2>
              <p className="text-sm text-muted-foreground mt-2">
                A tua conta foi temporariamente bloqueada. Isto pode acontecer por:
              </p>
              <ul className="text-sm text-muted-foreground mt-3 space-y-1 text-left max-w-xs mx-auto">
                <li>• Demasiadas tentativas de login falhadas</li>
                <li>• Actividade suspeita detectada</li>
                <li>• Violação dos termos de serviço</li>
              </ul>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full gap-2">
                <Link href="/suporte/ticket">
                  <MessageCircle className="w-4 h-4" /> Contactar suporte
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Voltar à página inicial</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
