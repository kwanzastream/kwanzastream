"use client"
import { DropProgressCard } from "@/components/monetization/monetization-components"
import Link from "next/link"
export default function DropsActivosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎁 Drops Activos</h1>
      <DropProgressCard brand="Unitel" prize="1GB dados grátis" progress={234} total={500} revenue="5.000 Kz" />
      <DropProgressCard brand="Jumia Angola" prize="Voucher 2.000 Kz" progress={89} total={200} revenue="2.000 Kz" />
      <Link href="/dashboard/monetizacao/drops/historico"><button className="text-xs text-primary hover:underline">Ver histórico →</button></Link>
    </div>
  )
}
