import { Router } from 'express';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware';
import { getRecommendedStreams, getSuggestedCreators } from '../controllers/recommendationController';

const router = Router();

// Recommended streams (works for both auth and non-auth, personalised when authenticated)
router.get('/streams', optionalAuthMiddleware, getRecommendedStreams);

// Suggested creators to follow (requires auth for personalisation)
router.get('/creators', authMiddleware, getSuggestedCreators);

export default router;
