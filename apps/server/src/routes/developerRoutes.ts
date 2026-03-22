import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    createApp, getApps, getAppById, updateApp, deleteApp,
    getAppCredentials, rotateSecret, getAppLogs, getAppAnalytics,
    getWebhooks, createWebhook, updateWebhook, deleteWebhook, testWebhook,
    createExtension, getExtensions, getExtensionById, submitExtension,
} from '../controllers/developerController';

const router = Router();
router.use(authMiddleware as any);

// Apps
router.post('/apps', createApp as any);
router.get('/apps', getApps as any);
router.get('/apps/:id', getAppById as any);
router.patch('/apps/:id', updateApp as any);
router.delete('/apps/:id', deleteApp as any);
router.get('/apps/:id/credentials', getAppCredentials as any);
router.post('/apps/:id/credentials/rotate', rotateSecret as any);
router.get('/apps/:id/logs', getAppLogs as any);
router.get('/apps/:id/analytics', getAppAnalytics as any);

// Webhooks
router.get('/apps/:id/webhooks', getWebhooks as any);
router.post('/apps/:id/webhooks', createWebhook as any);
router.patch('/apps/:id/webhooks/:whId', updateWebhook as any);
router.delete('/apps/:id/webhooks/:whId', deleteWebhook as any);
router.post('/apps/:id/webhooks/:whId/test', testWebhook as any);

// Extensions
router.post('/extensions', createExtension as any);
router.get('/extensions', getExtensions as any);
router.get('/extensions/:id', getExtensionById as any);
router.post('/extensions/:id/submit', submitExtension as any);

export default router;
