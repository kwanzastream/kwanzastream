"use client"

import { useParams } from "next/navigation"
import { MessageMediaGallery } from "@/components/messages/message-media-gallery"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const MOCK_MEDIA = [
  { id: "m1", url: "/placeholder.jpg", type: "image" as const, date: new Date(Date.now() - 86400000).toISOString() },
  { id: "m2", url: "/placeholder.jpg", type: "gif" as const, date: new Date(Date.now() - 172800000).toISOString() },
  { id: "m3", url: "https://kwanzastream.com", type: "link" as const, title: "Kwanza Stream", date: new Date(Date.now() - 259200000).toISOString() },
]

export default function ConversationMediaPage() {
  const params = useParams()
  const convId = params.id as string

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/mensagens/${convId}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-xl font-bold">Media partilhada</h1>
      </div>
      <MessageMediaGallery items={MOCK_MEDIA} />
    </div>
  )
}
