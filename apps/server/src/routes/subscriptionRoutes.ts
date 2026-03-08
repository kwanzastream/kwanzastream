import { Router } from 'express';
import {
    subscribe,
    cancelSubscription,
    getMySubscriptions,
    getCreatorSubscribers,
    checkSubscription,
} from '../controllers/subscriptionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Protected routes
router.post('/', authMiddleware, subscribe);
router.delete('/:id', authMiddleware, cancelSubscription);
router.get('/me', authMiddleware, getMySubscriptions);
router.get('/check/:creatorId', authMiddleware, checkSubscription);
router.get('/creator/:id', getCreatorSubscribers);

export default router;
