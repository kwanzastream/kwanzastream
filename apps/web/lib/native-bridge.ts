/**
 * Capacitor Native Bridge
 * Initializes native plugins when running inside a Capacitor app.
 * Falls back gracefully when running in a regular browser.
 */

import { Capacitor } from '@capacitor/core'

export const isNative = Capacitor.isNativePlatform()
export const platform = Capacitor.getPlatform() // 'android' | 'ios' | 'web'

/**
 * Initialize native app features (call once in _app or layout)
 */
export async function initNativeApp() {
    if (!isNative) return

    try {
        // Status Bar — dark theme
        const { StatusBar, Style } = await import('@capacitor/status-bar')
        await StatusBar.setBackgroundColor({ color: '#050505' })
        await StatusBar.setStyle({ style: Style.Dark })
    } catch { /* StatusBar not available */ }

    try {
        // Splash Screen — hide after app loads
        const { SplashScreen } = await import('@capacitor/splash-screen')
        await SplashScreen.hide()
    } catch { /* SplashScreen not available */ }

    try {
        // App — handle back button and URL open
        const { App: CapApp } = await import('@capacitor/app')

        // Handle hardware back button on Android
        CapApp.addListener('backButton', ({ canGoBack }) => {
            if (canGoBack) {
                window.history.back()
            } else {
                CapApp.exitApp()
            }
        })

        // Handle deep links
        CapApp.addListener('appUrlOpen', ({ url }) => {
            const slug = url.split('kwanzastream.com').pop()
            if (slug) {
                window.location.href = slug
            }
        })
    } catch { /* App plugin not available */ }
}

/**
 * Trigger a haptic feedback (native only)
 */
export async function hapticFeedback(style: 'light' | 'medium' | 'heavy' = 'medium') {
    if (!isNative) return

    try {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics')
        const styleMap = {
            light: ImpactStyle.Light,
            medium: ImpactStyle.Medium,
            heavy: ImpactStyle.Heavy,
        }
        await Haptics.impact({ style: styleMap[style] })
    } catch { /* Haptics not available */ }
}

/**
 * Request native push notification permissions
 */
export async function requestNativePushPermission(): Promise<boolean> {
    if (!isNative) return false

    try {
        const { PushNotifications } = await import('@capacitor/push-notifications')
        const result = await PushNotifications.requestPermissions()
        if (result.receive === 'granted') {
            await PushNotifications.register()
            return true
        }
    } catch { /* PushNotifications not available */ }
    return false
}
