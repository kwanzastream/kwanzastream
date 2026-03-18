"use client"
import { useParams } from "next/navigation"
import { StreamPoll } from "@/components/stream/stream-poll"

export default function StreamPollPage() {
  const { username } = useParams()

  // Mock active poll
  const mockPoll = {
    question: "Que jogo jogamos a seguir?",
    options: [
      { id: "o1", label: "FIFA 25", votes: 145 },
      { id: "o2", label: "GTA VI", votes: 230 },
      { id: "o3", label: "Mortal Kombat", votes: 89 },
    ],
    totalVotes: 464,
    endsAt: new Date(Date.now() + 300000).toISOString(), // 5 min from now
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <StreamPoll {...mockPoll} username={username as string} />
      </div>
    </div>
  )
}
