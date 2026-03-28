import type { Metadata } from "next"
export const metadata: Metadata = { title: "Just Talking ao Vivo | Kwanza Stream", description: "Conversas e debates ao vivo no Kwanza Stream." }

import { LiveCategoryPage } from "@/components/live-category-page"

export default function AoVivoJustTalkingPage() {
  return <LiveCategoryPage category="just-talking" title="Just Talking" emoji="💬" description="Conversas, debates e opiniões — a voz de Angola ao vivo." />
}
