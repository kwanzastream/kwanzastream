"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { StreamSummaryCard } from "@/components/go-live/stream-summary-card"
import { Square, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function GoLiveAudioOnlyEncerrarPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [ended, setEnded] = useState(false)
  const [ending, setEnding] = useState(false)

  const handleEnd = async () => {
    setEnding(true)
    await new Promise(r => setTimeout(r, 1500))
    sessionStorage.removeItem("go-live-audio-setup")
    setEnded(true)
    toast.success("Rádio encerrada!")
  }

  if (ended) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <StreamSummaryCard duration={5400} uniqueViewers={234} peakViewers={89} salosReceived={1200} newFollowers={8} clipsCreated={0} username={user?.username || ""} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <Square className="w-16 h-16 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold">Encerrar rádio?</h2>
        <p className="text-sm text-muted-foreground">Tens a certeza que queres encerrar a transmissão de áudio?</p>
        <div className="space-y-2">
          <Button className="w-full bg-red-600 hover:bg-red-700 h-12" onClick={handleEnd} disabled={ending}>
            {ending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Encerrar rádio"}
          </Button>
          <Button variant="outline" className="w-full h-12" onClick={() => router.back()}>Continuar</Button>
        </div>
      </div>
    </div>
  )
}
