import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Explorar Lives — Kwanza Stream",
    description: "Descobre as melhores lives de Angola. Gaming, Kuduro, Futebol, Conversa e muito mais. Entra e conecta-te com creators angolanos.",
    openGraph: {
        title: "Explorar Lives — Kwanza Stream",
        description: "Descobre as melhores lives de Angola. Gaming, Kuduro, Futebol, e muito mais.",
        type: "website",
        locale: "pt_AO",
        siteName: "Kwanza Stream",
    },
    twitter: {
        card: "summary_large_image",
        title: "Explorar Lives — Kwanza Stream",
        description: "A plataforma de live streaming de Angola 🇦🇴",
    },
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
    return children
}
