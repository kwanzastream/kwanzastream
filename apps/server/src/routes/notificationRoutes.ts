import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
} from '../controllers/notificationController';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/read-all', markAllAsRead); // Must be before /:id to avoid catch-all
router.patch('/:id/read', markAsRead);

export default router;
