import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s — Kwanza Stream", default: "Calendário de Streams — Kwanza Stream" },
  description: "Streams agendados na plataforma Kwanza Stream. Descobre quem vai transmitir e a que horas. Hora de Angola (WAT, UTC+1).",
  openGraph: {
    title: "Calendário de Streams — Kwanza Stream",
    description: "Todos os streams agendados no Kwanza Stream.",
    type: "website",
    locale: "pt_AO",
  },
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children
}
