"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function VerificarEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      toast.error("Link de verificação inválido")
      router.replace("/entrar")
      return
    }

    api.get(`/api/auth/verify-email/${token}`)
      .then(() => {
        toast.success("Email verificado com sucesso! 🎉")
        router.replace("/feed")
      })
      .catch(() => {
        toast.error("Link expirado ou inválido")
        router.replace("/entrar")
      })
  }, [token, router])

  return (
    <AuthLayout>
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">A verificar o teu email...</p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default function VerificarEmailPage() {
  return <Suspense fallback={null}><VerificarEmailContent /></Suspense>
}
