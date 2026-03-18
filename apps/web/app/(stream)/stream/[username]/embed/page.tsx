"use client"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function StreamEmbedRedirectPage() {
  const { username } = useParams()
  const router = useRouter()

  useEffect(() => {
    router.replace(`/embed/${username}`)
  }, [username, router])

  return null
}
