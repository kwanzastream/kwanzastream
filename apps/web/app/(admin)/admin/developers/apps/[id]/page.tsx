"use client"
import { useParams } from "next/navigation"
export default function DevAppDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">App #{(id as string).slice(0,8)}</h1>
  <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-xs"><strong>Nome:</strong> KS Bot</p><p className="text-xs"><strong>Developer:</strong> @dev1</p><p className="text-xs"><strong>API calls/dia:</strong> 12.340</p></div></div>) }
