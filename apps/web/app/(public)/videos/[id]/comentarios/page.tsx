"use client"
import { useParams } from "next/navigation"
import { VodComments, type Comment } from "@/components/videos/vod-comments"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: Comment[] = [
  { id: "c1", content: "Stream incrível! Adoro a energia 🔥", createdAt: new Date().toISOString(), likes: 12, author: { username: "viewer_001", displayName: "Viewer" }, replies: [{ id: "r1", content: "Concordo!", createdAt: new Date().toISOString(), likes: 3, author: { username: "fan123", displayName: "Fan" } }] },
  { id: "c2", content: "Qual é a música aos 1:23:45?", createdAt: new Date().toISOString(), likes: 5, author: { username: "music_fan", displayName: "Music Fan" } },
]

export default function VideoComentariosPage() {
  const { id } = useParams()
  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/videos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Comentários</h1></div>
      <VodComments comments={MOCK} videoId={id as string} />
    </div>
  )
}
