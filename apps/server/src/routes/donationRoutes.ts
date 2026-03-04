import { Router } from 'express';
import {
    sendDonation,
    getSaloTypes,
    getLeaderboard,
    getTopCreators,
    getDonationHistory,
} from '../controllers/donationController';
import { authMiddleware } from '../middleware/authMiddleware';
import { kycGate } from '../middleware/kycGate';

const router = Router();

// Public routes
router.get('/salo-types', getSaloTypes);
router.get('/leaderboard', getLeaderboard);
router.get('/top-creators', getTopCreators);

// Protected routes — P0: KYC gate enforces tier limits on donations
router.post('/', authMiddleware, kycGate('donate'), sendDonation);
router.get('/history', authMiddleware, getDonationHistory);

export default router;
