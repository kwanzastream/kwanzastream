import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Kwanza Stream',
        short_name: 'Kwanza',
        description: 'A primeira plataforma de streaming social angolana. Faz lives, ganha dinheiro, conecta-te com Angola.',
        start_url: '/feed',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0a0a0a',
        theme_color: '#c4391c',
        categories: ['entertainment', 'social'],
        icons: [
            {
                src: '/kwanza-logo-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/kwanza-logo-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    }
}
