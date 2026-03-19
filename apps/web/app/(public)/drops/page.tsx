"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DropsPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/drops/activos") }, [router])
  return null
}
