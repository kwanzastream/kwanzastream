import { Router } from 'express';
import { getMyLink, generateNewLink, getFriends, getRewardsHistory, validateCode, registerReferral } from '../controllers/referralController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public
router.get('/validate/:code', validateCode);
router.post('/register', registerReferral);

// Authenticated
router.get('/my-link', authenticate, getMyLink);
router.post('/generate', authenticate, generateNewLink);
router.get('/friends', authenticate, getFriends);
router.get('/rewards/history', authenticate, getRewardsHistory);

export default router;
