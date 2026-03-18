"use client"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function VideoCanalPage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  // Redirect to /:username/videos to avoid content duplication
  useEffect(() => { router.replace(`/${username}/videos`) }, [username, router])

  return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
}
