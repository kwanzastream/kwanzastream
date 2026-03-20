"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function ContentHubPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/content/vods") }, [router])
  return null
}
