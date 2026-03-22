"use client"
import { useParams } from "next/navigation"
import { getProvince } from "@/lib/angola-provinces"
import { redirect } from "next/navigation"
export default function MapaProvinciaPage() { const { provincia } = useParams(); const p = getProvince(provincia as string); if (p) redirect(`/provincias/${p.slug}`); return <div className="text-center py-20 text-muted-foreground">Província não encontrada</div> }
