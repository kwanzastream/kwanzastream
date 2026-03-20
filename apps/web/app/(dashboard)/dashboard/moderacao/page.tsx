"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function ModeracaoHubPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/moderacao/settings") }, [router])
  return null
}
