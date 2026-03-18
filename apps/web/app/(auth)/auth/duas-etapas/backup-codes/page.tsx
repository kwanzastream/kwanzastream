"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Key } from "lucide-react"

export default function DuasEtapasBackupCodesPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 8) return
    setIsLoading(true)
    try {
      // POST /api/auth/2fa/verify-backup
      toast.success("Verificação completa!")
      router.push("/feed")
    } catch {
      toast.error("Código de backup inválido")
      setCode("")
    } finally { setIsLoading(false) }
  }

  return (
    <AuthLayout showBackLink backHref="/auth/duas-etapas" backLabel="Escolher outro método">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
            <Key className="w-6 h-6 text-amber-500" />
          </div>
          <CardTitle>Código de backup</CardTitle>
          <CardDescription>Insere um dos teus códigos de backup de 8 caracteres</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Código de backup</Label>
              <Input
                placeholder="XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))}
                maxLength={9}
                className="text-center font-mono text-lg tracking-wider"
              />
            </div>
            <Button type="submit" className="w-full" disabled={code.length < 8 || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Verificar código
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Cada código de backup só pode ser usado uma vez. Para ver ou regenerar os teus códigos, vai a Definições → Segurança.
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
