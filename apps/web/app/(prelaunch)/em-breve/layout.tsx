import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kwanza Stream — Em Breve | A plataforma de streaming angolana",
    description:
        "A Kwanza Stream está quase a chegar. Inscreve-te e sê dos primeiros a entrar na plataforma de streaming feita para Angola.",
    openGraph: {
        title: "🚀 Kwanza Stream — Em Breve",
        description:
            "A plataforma de streaming angolana está a chegar. Inscreve-te para seres notificado quando estivermos ao vivo!",
        type: "website",
        locale: "pt_AO",
        siteName: "Kwanza Stream",
        images: [
            {
                url: "/kwanza-logo-512.png",
                width: 512,
                height: 512,
                alt: "Kwanza Stream Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "🚀 Kwanza Stream — Em Breve",
        description:
            "A plataforma de streaming angolana está a chegar. Inscreve-te!",
    },
    other: {
        "og:locale": "pt_AO",
    },
}

export default function EmBreveLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
