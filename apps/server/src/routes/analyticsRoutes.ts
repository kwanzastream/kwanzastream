import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    getPlatformAnalytics,
    getRevenueReport,
} from '../controllers/analyticsController';

const router = Router();

// Admin-only analytics (admin role check should be done via adminMiddleware in production)
router.get('/platform', authMiddleware, getPlatformAnalytics);
router.get('/revenue', authMiddleware, getRevenueReport);

export default router;
