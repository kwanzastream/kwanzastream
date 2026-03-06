import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Feed — Kwanza Stream",
    description: "O teu feed personalizado de lives angolanas. Assiste, interage e apoia os teus creators favoritos no Kwanza Stream.",
    openGraph: {
        title: "Feed — Kwanza Stream",
        description: "O teu feed personalizado de lives angolanas.",
        type: "website",
        locale: "pt_AO",
        siteName: "Kwanza Stream",
    },
}

export default function FeedLayout({ children }: { children: React.ReactNode }) {
    return children
}
