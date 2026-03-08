import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

interface PushSub {
    id: string
    endpoint: string
    p256dh: string
    auth: string
    userId: string
}

// web-push is optional — push notifications only work when VAPID keys are configured
let webpush: any
try {
    webpush = require('web-push')
} catch {
    console.warn('web-push not installed. Push notifications disabled.')
}

const prisma = new PrismaClient()

// Configure web-push with VAPID keys
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || ''
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || ''
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:admin@kwanzastream.com'

if (webpush && VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    try {
        webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)
    } catch (err) {
        console.warn('⚠️  Invalid VAPID keys — push notifications disabled:', (err as Error).message)
        webpush = null
    }
}

// POST /api/push/subscribe
export const subscribe = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId
        if (!userId) return res.status(401).json({ error: 'Não autenticado' })

        const { subscription } = req.body
        if (!subscription?.endpoint || !subscription?.keys) {
            return res.status(400).json({ error: 'Subscription inválida' })
        }

        // Upsert subscription (one per endpoint)
        await (prisma as any).pushSubscription.upsert({
            where: { endpoint: subscription.endpoint },
            update: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
                userId,
                updatedAt: new Date(),
            },
            create: {
                endpoint: subscription.endpoint,
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
                userId,
            },
        })

        res.json({ success: true, message: 'Notificações activadas' })
    } catch (error) {
        console.error('Push subscribe error:', error)
        res.status(500).json({ error: 'Erro ao registar notificações' })
    }
}

// POST /api/push/unsubscribe
export const unsubscribe = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId
        const { endpoint } = req.body

        if (!endpoint) return res.status(400).json({ error: 'Endpoint obrigatório' })

        await (prisma as any).pushSubscription.deleteMany({
            where: { endpoint, userId },
        })

        res.json({ success: true, message: 'Notificações desactivadas' })
    } catch (error) {
        console.error('Push unsubscribe error:', error)
        res.status(500).json({ error: 'Erro ao desregistar notificações' })
    }
}

// POST /api/push/test — Send test notification to current user
export const sendTest = async (req: Request, res: Response) => {
    try {
        if (!webpush) return res.status(503).json({ error: 'Push notifications não configuradas' })

        const userId = (req as any).userId
        if (!userId) return res.status(401).json({ error: 'Não autenticado' })

        const subscriptions: PushSub[] = await (prisma as any).pushSubscription.findMany({
            where: { userId },
        })

        if (subscriptions.length === 0) {
            return res.status(404).json({ error: 'Sem subscriptions registadas' })
        }

        const payload = JSON.stringify({
            title: '🔔 Kwanza Stream',
            body: 'Notificações push activadas com sucesso! 🎉',
            icon: '/icons/icon-192x192.png',
            url: '/feed',
            type: 'general',
            tag: 'test-notification',
        })

        const results = await Promise.allSettled(
            subscriptions.map((sub: PushSub) =>
                webpush.sendNotification(
                    {
                        endpoint: sub.endpoint,
                        keys: { p256dh: sub.p256dh, auth: sub.auth },
                    },
                    payload
                )
            )
        )

        // Clean up expired subscriptions
        const expired = results
            .map((r: PromiseSettledResult<unknown>, i: number) => (r.status === 'rejected' ? subscriptions[i].id : null))
            .filter(Boolean) as string[]

        if (expired.length > 0) {
            await (prisma as any).pushSubscription.deleteMany({
                where: { id: { in: expired } },
            })
        }

        const sent = results.filter((r: PromiseSettledResult<unknown>) => r.status === 'fulfilled').length
        res.json({ success: true, sent, expired: expired.length })
    } catch (error) {
        console.error('Push test error:', error)
        res.status(500).json({ error: 'Erro ao enviar notificação de teste' })
    }
}

// Utility: Send notification to a specific user (for use by other controllers)
export const sendPushToUser = async (
    userId: string,
    notification: { title: string; body: string; url?: string; type?: string; icon?: string; tag?: string }
) => {
    if (!webpush || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return

    try {
        const subscriptions: PushSub[] = await (prisma as any).pushSubscription.findMany({
            where: { userId },
        })

        if (subscriptions.length === 0) return

        const payload = JSON.stringify({
            title: notification.title,
            body: notification.body,
            icon: notification.icon || '/icons/icon-192x192.png',
            url: notification.url || '/',
            type: notification.type || 'general',
            tag: notification.tag || `notification-${Date.now()}`,
        })

        const results = await Promise.allSettled(
            subscriptions.map((sub: PushSub) =>
                webpush.sendNotification(
                    {
                        endpoint: sub.endpoint,
                        keys: { p256dh: sub.p256dh, auth: sub.auth },
                    },
                    payload
                )
            )
        )

        // Clean up expired
        const expired = results
            .map((r: PromiseSettledResult<unknown>, i: number) => (r.status === 'rejected' ? subscriptions[i].id : null))
            .filter(Boolean) as string[]

        if (expired.length > 0) {
            await (prisma as any).pushSubscription.deleteMany({
                where: { id: { in: expired } },
            })
        }
    } catch (error) {
        console.error('Push send error:', error)
    }
}
