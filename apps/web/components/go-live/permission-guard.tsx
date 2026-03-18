"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ShieldAlert, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PermissionGuardProps {
  children: React.ReactNode
  requireCamera?: boolean
  requireMic?: boolean
  redirectOnDeny?: string
}

export function PermissionGuard({
  children, requireCamera = true, requireMic = true,
  redirectOnDeny = "/go-live/mobile/permissoes",
}: PermissionGuardProps) {
  const router = useRouter()
  const [status, setStatus] = useState<"checking" | "granted" | "denied" | "unsupported">("checking")

  useEffect(() => {
    const check = async () => {
      // 1. Check HTTPS
      if (typeof window !== "undefined" && location.protocol !== "https:" && location.hostname !== "localhost") {
        setStatus("unsupported"); return
      }
      // 2. Check MediaDevices API
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("unsupported"); return
      }
      // 3. Try permissions
      try {
        const constraints: MediaStreamConstraints = {}
        if (requireCamera) constraints.video = true
        if (requireMic) constraints.audio = true
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        stream.getTracks().forEach(t => t.stop()) // release immediately
        setStatus("granted")
      } catch (err: any) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setStatus("denied")
        } else {
          setStatus("unsupported")
        }
      }
    }
    check()
  }, [requireCamera, requireMic])

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">A verificar permissões...</p>
        </div>
      </div>
    )
  }

  if (status === "unsupported") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-lg font-bold">Browser não suportado</h2>
          <p className="text-sm text-muted-foreground">
            O teu browser não suporta transmissão ao vivo. Usa o Chrome, Firefox ou Safari actualizados com HTTPS.
          </p>
          <Button variant="outline" onClick={() => router.push("/go-live")}>Voltar</Button>
        </div>
      </div>
    )
  }

  if (status === "denied") {
    router.push(redirectOnDeny)
    return null
  }

  return <>{children}</>
}
