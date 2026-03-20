"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function MembrosHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/membership/membros/activos") }, [router])
  return null
}
