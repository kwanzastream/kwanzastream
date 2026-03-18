import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"

export default function SessaoExpiradaPage() {
  return (
    <AuthLayout>
      <Card>
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Sessão expirada</h2>
              <p className="text-sm text-muted-foreground mt-2">
                A tua sessão expirou por inactividade. Entra novamente para continuar.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/entrar">
                Entrar novamente <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
