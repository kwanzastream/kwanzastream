"use client"
import { Heart, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface SalosPackage {
  amount: number
  price: number
  discount?: number
}

export const SALOS_PACKAGES: SalosPackage[] = [
  { amount: 50, price: 50 },
  { amount: 200, price: 180, discount: 10 },
  { amount: 500, price: 430, discount: 14 },
  { amount: 1000, price: 850, discount: 15 },
  { amount: 2500, price: 2000, discount: 20 },
  { amount: 5000, price: 3900, discount: 22 },
]

export function SalosPackageCard({ pkg }: { pkg: SalosPackage }) {
  return (
    <Link href={`/salos/comprar/${pkg.amount}`} className="block">
      <div className="p-4 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-all flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
          <div><p className="text-sm font-bold">{pkg.amount.toLocaleString()} Salos</p>{pkg.discount && <p className="text-[9px] text-green-400 flex items-center gap-0.5"><Tag className="w-3 h-3" />-{pkg.discount}%</p>}</div>
        </div>
        <p className="text-sm font-bold">{pkg.price.toLocaleString()} Kz</p>
      </div>
    </Link>
  )
}
