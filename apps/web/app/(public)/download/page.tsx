import type { Metadata } from "next"
export const metadata: Metadata = { title: "Descarregar Kwanza Stream | Kwanza Stream", description: "Descarrega a app do Kwanza Stream para todos os dispositivos." }

import { redirect } from "next/navigation"
export default function DownloadPage() { redirect("/app") }
