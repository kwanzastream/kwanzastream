"use client"

import { FeedCardStream } from "./feed-card-stream"
import { FeedCardVideo } from "./feed-card-video"
import { FeedCardClip } from "./feed-card-clip"
import { FeedCardShort } from "./feed-card-short"

export interface FeedItem {
  type: "stream" | "video" | "clip" | "short"
  id: string
  title: string
  category?: string
  viewerCount?: number
  views?: number
  duration?: number
  thumbnailUrl?: string
  videoUrl?: string
  startedAt?: string
  uploadedAt?: string
  streamer: { username: string; displayName: string; avatarUrl?: string }
}

interface FeedMixedListProps {
  items: FeedItem[]
  className?: string
}

/**
 * Renders a mixed feed with interleaving by type (review correction #4).
 * Items should already be interleaved by the API or pre-sorted.
 * If raw items come grouped by type, use `interleaveFeedItems()` to mix them.
 */
export function FeedMixedList({ items, className = "" }: FeedMixedListProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
      {items.map((item) => {
        switch (item.type) {
          case "stream":
            return (
              <FeedCardStream
                key={`s-${item.id}`} id={item.id} title={item.title}
                category={item.category || ""} viewerCount={item.viewerCount || 0}
                thumbnailUrl={item.thumbnailUrl} startedAt={item.startedAt}
                streamer={item.streamer}
              />
            )
          case "video":
            return (
              <FeedCardVideo
                key={`v-${item.id}`} id={item.id} title={item.title}
                category={item.category} duration={item.duration || 0}
                views={item.views || 0} thumbnailUrl={item.thumbnailUrl}
                uploadedAt={item.uploadedAt || new Date().toISOString()}
                streamer={item.streamer}
              />
            )
          case "clip":
            return (
              <FeedCardClip
                key={`c-${item.id}`} id={item.id} title={item.title}
                duration={item.duration || 30} views={item.views || 0}
                videoUrl={item.videoUrl} thumbnailUrl={item.thumbnailUrl}
                streamer={item.streamer}
              />
            )
          case "short":
            return (
              <FeedCardShort
                key={`sh-${item.id}`} id={item.id} title={item.title}
                views={item.views || 0} videoUrl={item.videoUrl}
                thumbnailUrl={item.thumbnailUrl} streamer={item.streamer}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

/**
 * Interleave items by type to avoid blocks of same type.
 * Pattern per "page" of 20: stream · VOD · clip · stream · stream · VOD · short · clip · ...
 */
export function interleaveFeedItems(items: FeedItem[]): FeedItem[] {
  const streams = items.filter(i => i.type === "stream")
  const videos = items.filter(i => i.type === "video")
  const clips = items.filter(i => i.type === "clip")
  const shorts = items.filter(i => i.type === "short")

  const result: FeedItem[] = []
  const maxLen = Math.max(streams.length, videos.length, clips.length, shorts.length)

  for (let i = 0; i < maxLen; i++) {
    // Pattern: 2 streams, 1 VOD, 1 clip, then every 4th cycle add a short
    if (streams[i * 2]) result.push(streams[i * 2])
    if (videos[i]) result.push(videos[i])
    if (clips[i]) result.push(clips[i])
    if (streams[i * 2 + 1]) result.push(streams[i * 2 + 1])
    if (i % 2 === 0 && shorts[Math.floor(i / 2)]) result.push(shorts[Math.floor(i / 2)])
  }

  return result
}
