'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

type PushPermissionState = 'prompt' | 'granted' | 'denied' | 'unsupported'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export function usePushNotifications() {
    const [permission, setPermission] = useState<PushPermissionState>('prompt')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const registrationRef = useRef<ServiceWorkerRegistration | null>(null)

    // Check support and current state
    useEffect(() => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            setPermission('unsupported')
            return
        }

        // Check current Notification permission
        setPermission(Notification.permission as PushPermissionState)

        // Register service worker and check subscription
        navigator.serviceWorker.register('/sw-push.js')
            .then(async (registration) => {
                registrationRef.current = registration
                const subscription = await registration.pushManager.getSubscription()
                setIsSubscribed(!!subscription)
            })
            .catch(() => {
                setError('Falha ao registar service worker')
            })
    }, [])

    const subscribe = useCallback(async () => {
        if (!registrationRef.current || !VAPID_PUBLIC_KEY) {
            setError('Push notifications não configuradas')
            return false
        }

        setIsLoading(true)
        setError(null)

        try {
            // Request permission
            const result = await Notification.requestPermission()
            setPermission(result as PushPermissionState)

            if (result !== 'granted') {
                setError('Permissão negada')
                setIsLoading(false)
                return false
            }

            // Subscribe to push
            const subscription = await registrationRef.current.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
            })

            // Send subscription to backend
            const response = await fetch(`${API_URL}/api/push/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ subscription: subscription.toJSON() }),
            })

            if (!response.ok) throw new Error('Falha ao registar no servidor')

            setIsSubscribed(true)
            setIsLoading(false)
            return true
        } catch (err: any) {
            setError(err.message || 'Erro ao activar notificações')
            setIsLoading(false)
            return false
        }
    }, [])

    const unsubscribe = useCallback(async () => {
        if (!registrationRef.current) return false

        setIsLoading(true)
        setError(null)

        try {
            const subscription = await registrationRef.current.pushManager.getSubscription()
            if (subscription) {
                // Notify backend
                await fetch(`${API_URL}/api/push/unsubscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                }).catch(() => { })

                await subscription.unsubscribe()
            }

            setIsSubscribed(false)
            setIsLoading(false)
            return true
        } catch (err: any) {
            setError(err.message || 'Erro ao desactivar notificações')
            setIsLoading(false)
            return false
        }
    }, [])

    const sendTestNotification = useCallback(async () => {
        try {
            await fetch(`${API_URL}/api/push/test`, {
                method: 'POST',
                credentials: 'include',
            })
        } catch {
            setError('Falha ao enviar notificação de teste')
        }
    }, [])

    return {
        permission,
        isSubscribed,
        isLoading,
        error,
        subscribe,
        unsubscribe,
        sendTestNotification,
        isSupported: permission !== 'unsupported',
    }
}
