"use client"

import { FeaturedSubNav } from "@/components/featured/featured-sub-nav"

export default function FeaturedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Featured & Vitrina</h1>
        <p className="text-sm text-muted-foreground mt-1">Personaliza como o teu canal aparece para os viewers.</p>
      </div>
      <FeaturedSubNav />
      <div>{children}</div>
    </div>
  )
}
