export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  // Clean layout — no navbar, no footer, no sidebar
  return <>{children}</>
}
