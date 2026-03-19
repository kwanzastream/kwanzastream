"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ClipCanalPage() {
  const { username } = useParams()
  const router = useRouter()
  useEffect(() => { router.replace(`/${username}/clips`) }, [username, router])
  return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
}
