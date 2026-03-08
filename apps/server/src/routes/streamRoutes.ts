import { Router } from 'express';
import {
    getLiveStreams,
    getStream,
    createStream,
    updateStream,
    endStream,
    getUserStreams,
    onStreamPublish,
    onStreamUnpublish,
    regenerateStreamKey,
    getStreamHealth,
    getCategories,
    getFeaturedStreams,
} from '../controllers/streamController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/live', getLiveStreams);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedStreams);
router.get('/:id', getStream);
router.get('/:id/health', getStreamHealth);
router.get('/user/:id', getUserStreams);

// Protected routes
router.post('/', authMiddleware, createStream);
router.put('/:id', authMiddleware, updateStream);
router.post('/:id/end', authMiddleware, endStream);
router.post('/regenerate-key', authMiddleware, regenerateStreamKey);

// RTMP server callbacks (should be secured in production)
router.post('/callback/publish', onStreamPublish);
router.post('/callback/unpublish', onStreamUnpublish);

export default router;

