import { notFound } from "next/navigation"
import { api } from "@/lib/api"
import { ChannelHeaderStatic, type ChannelData } from "@/components/channel/channel-header-static"
import { ChannelHeaderActions } from "@/components/channel/channel-header-actions"
import { ChannelTabs } from "@/components/channel/channel-tabs"
import { ChannelSuspendedPage } from "@/components/channel/channel-suspended-page"
import { isReservedUsername } from "@/lib/reserved-usernames"

async function getChannel(username: string): Promise<ChannelData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users/${username}`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.user || null
  } catch {
    return null
  }
}

export default async function ChannelLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  // Don't try to fetch reserved names as channels
  if (isReservedUsername(username)) notFound()

  const channel = await getChannel(username)

  if (!channel) notFound()

  // Suspended / banned
  if (channel.status === "suspended" || channel.status === "banned") {
    return <ChannelSuspendedPage username={username} />
  }

  return (
    <div className="min-h-screen">
      <ChannelHeaderStatic channel={channel} />
      <ChannelHeaderActions
        channelId={channel.id}
        username={username}
        monetizationActive={channel.settings?.monetizationActive}
      />
      <ChannelTabs username={username} />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  )
}
