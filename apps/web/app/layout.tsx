import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ToastProvider } from "@/components/error-toast"
import { MobileNav } from "@/components/mobile-nav"
import { OfflineBanner } from "@/components/offline-banner"
import { I18nProvider } from "@/lib/i18n"
import { PostHogProvider } from "@/lib/posthog"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kwanza Stream - Rede Social para Creators Angolanos",
  description: "A primeira plataforma de streaming social angolana. Faz lives, ganha dinheiro, conecta-te com Angola.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kwanza Stream",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: "/kwanza-logo.png",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-AO">
      <body className={`font-sans antialiased min-h-dvh`}>
        <AuthProvider>
          <PostHogProvider>
            <I18nProvider>
              <ToastProvider>
                <OfflineBanner />
                {children}
                <MobileNav />
              </ToastProvider>
            </I18nProvider>
          </PostHogProvider>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
