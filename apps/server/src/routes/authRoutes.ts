import { Router } from 'express';
import {
    requestOtp,
    verifyOtpAndLogin,
    register,
    loginWithPassword,
    refreshAccessToken,
    logout,
    logoutAll,
    getMe,
    sendVerificationEmail,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
} from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', loginWithPassword);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtpAndLogin);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// Email verification & password recovery (public)
router.post('/verify-email', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout-all', authMiddleware, logoutAll);
router.get('/me', authMiddleware, getMe);
router.post('/send-verification-email', authMiddleware, sendVerificationEmail);

export default router;
