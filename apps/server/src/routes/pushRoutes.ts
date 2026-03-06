import { Router } from 'express'
import { subscribe, unsubscribe, sendTest } from '../controllers/pushNotificationController'

const router = Router()

// All routes require authentication (handled by auth middleware in index.ts)
router.post('/subscribe', subscribe as any)
router.post('/unsubscribe', unsubscribe as any)
router.post('/test', sendTest as any)

export default router
