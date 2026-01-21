import { Router } from 'express';
import {
    sendDonation,
    getSaloTypes,
    getLeaderboard,
    getDonationHistory,
} from '../controllers/donationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/salo-types', getSaloTypes);
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.post('/', authMiddleware, sendDonation);
router.get('/history', authMiddleware, getDonationHistory);

export default router;
