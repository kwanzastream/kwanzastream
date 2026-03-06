'use client'

import { useEffect } from 'react'
import { initNativeApp } from '@/lib/native-bridge'

/**
 * Initializes Capacitor native app features.
 * Renders nothing — just runs the init logic on mount.
 */
export function NativeAppInit() {
    useEffect(() => {
        initNativeApp()
    }, [])

    return null
}
