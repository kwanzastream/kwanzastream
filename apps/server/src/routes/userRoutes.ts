import { Router } from 'express';
import {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    generateStreamKey,
} from '../controllers/userController';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes (with optional auth for isFollowing check)
router.get('/:id', optionalAuthMiddleware, getUserProfile);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

// Protected routes
router.put('/me', authMiddleware, updateProfile);
router.post('/:id/follow', authMiddleware, followUser);
router.delete('/:id/follow', authMiddleware, unfollowUser);
router.post('/me/stream-key', authMiddleware, generateStreamKey);

export default router;
