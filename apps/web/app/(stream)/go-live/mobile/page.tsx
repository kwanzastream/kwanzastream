"use client"
import { PermissionGuard } from "@/components/go-live/permission-guard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function GoLiveMobilePage() {
  const router = useRouter()
  // PermissionGuard handles the check — if granted, redirect to setup
  return (
    <PermissionGuard redirectOnDeny="/go-live/mobile/permissoes">
      <AutoRedirect />
    </PermissionGuard>
  )
}

function AutoRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/go-live/mobile/setup") }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  )
}
