"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TribosPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/tribos/explorar") }, [router])
  return null
}
