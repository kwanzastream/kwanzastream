"use client"

import { createContext, useContext, useState, useRef, ReactNode } from "react"

interface RadioStation {
  channel: string
  displayName: string
  title: string
  genre: string
  artworkUrl?: string
  listeners: number
}

interface RadioPlayerContextType {
  isPlaying: boolean
  currentStation: RadioStation | null
  volume: number
  play: (station: RadioStation) => void
  pause: () => void
  stop: () => void
  setVolume: (v: number) => void
}

const RadioPlayerContext = createContext<RadioPlayerContextType>({
  isPlaying: false, currentStation: null, volume: 80,
  play: () => {}, pause: () => {}, stop: () => {}, setVolume: () => {},
})

export function useRadioPlayer() { return useContext(RadioPlayerContext) }

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null)
  const [volume, setVolumeState] = useState(80)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = (station: RadioStation) => { setCurrentStation(station); setIsPlaying(true) }
  const pause = () => { setIsPlaying(false) }
  const stop = () => { setIsPlaying(false); setCurrentStation(null) }
  const setVolume = (v: number) => { setVolumeState(v); if (audioRef.current) audioRef.current.volume = v / 100 }

  return (
    <RadioPlayerContext.Provider value={{ isPlaying, currentStation, volume, play, pause, stop, setVolume }}>
      {children}
    </RadioPlayerContext.Provider>
  )
}
