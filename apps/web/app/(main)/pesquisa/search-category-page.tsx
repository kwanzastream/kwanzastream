"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchBar } from "@/components/search/search-bar"
import { SearchTabs } from "@/components/search/search-tabs"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchCategoryPageProps {
  category: string
  title: string
  filters?: { id: string; label: string }[]
  children: (query: string, filter: string) => React.ReactNode
}

function SearchCategoryContent({ category, title, filters, children }: SearchCategoryPageProps) {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(filters?.[0]?.id || "all")

  useEffect(() => { setLoading(true); setTimeout(() => setLoading(false), 400) }, [q, filter])

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 space-y-4">
      <SearchBar initialQuery={q} />
      <SearchTabs query={q} />
      {filters && <SearchFilters filters={filters} active={filter} onChange={setFilter} />}
      {loading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
        : q ? children(q, filter) : <SearchEmptyState query="" />}
    </div>
  )
}

export function SearchCategoryPage(props: SearchCategoryPageProps) {
  return <Suspense><SearchCategoryContent {...props} /></Suspense>
}
