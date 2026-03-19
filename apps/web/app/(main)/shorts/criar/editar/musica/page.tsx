"use client"
import { ShortEditor } from "@/components/shorts/short-editor"
import { MusicLibrary } from "@/components/shorts/music-library"
import { useState } from "react"
import { toast } from "sonner"
import type { Track } from "@/components/shorts/music-library"

export default function ShortsEditarMusicaPage() {
  const [selected, setSelected] = useState<string | undefined>()
  const handleSelect = (track: Track) => { setSelected(track.id); toast.success(`🎵 ${track.title} — ${track.artist}`) }

  return (
    <div className="py-4 px-4">
      <ShortEditor activeTab="musica">
        <MusicLibrary onSelect={handleSelect} selected={selected} />
      </ShortEditor>
    </div>
  )
}
