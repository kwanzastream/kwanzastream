import { SkeletonFeed } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SkeletonFeed />
    </div>
  )
}
