import { Router } from 'express';
import {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    generateStreamKey,
    completeOnboarding,
    checkUsername,
    getAutoModSettings,
    updateAutoModSettings,
} from '../controllers/userController';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware';
import { deleteMyAccount } from '../controllers/accountDeletionController';

const router = Router();

// Protected routes (must be before parameterized routes)
router.put('/me', authMiddleware, updateProfile);
router.delete('/me', authMiddleware, deleteMyAccount); // Right to Erasure (Lei 22/11)
router.post('/me/stream-key', authMiddleware, generateStreamKey);
router.post('/onboarding', authMiddleware, completeOnboarding);
router.get('/check-username/:username', optionalAuthMiddleware, checkUsername);

// Sprint 2: AutoMod per-channel settings
router.get('/me/automod', authMiddleware, getAutoModSettings);
router.put('/me/automod', authMiddleware, updateAutoModSettings);

// Public routes (with optional auth for isFollowing check)
router.get('/:id', optionalAuthMiddleware, getUserProfile);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

// Protected routes (parameterized)
router.post('/:id/follow', authMiddleware, followUser);
router.delete('/:id/follow', authMiddleware, unfollowUser);

export default router;
