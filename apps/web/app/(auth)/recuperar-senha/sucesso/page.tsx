import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export default function RecuperarSenhaSucessoPage() {
  return (
    <AuthLayout>
      <Card>
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Password alterada!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                A tua password foi alterada com sucesso. Já podes entrar com a nova password.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/entrar">
                Entrar <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
