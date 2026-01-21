import { Router } from 'express';
import {
    requestOtp,
    verifyOtpAndLogin,
    refreshAccessToken,
    logout,
    logoutAll,
    getMe,
} from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtpAndLogin);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// Protected routes
router.post('/logout-all', authMiddleware, logoutAll);
router.get('/me', authMiddleware, getMe);

export default router;
