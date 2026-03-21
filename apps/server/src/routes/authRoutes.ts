import { Router } from 'express';
import {
    requestOtp,
    verifyOtpAndLogin,
    completePhoneRegistration,
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
import { initiateGoogleAuth, handleGoogleCallback } from '../controllers/auth/googleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', loginWithPassword);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtpAndLogin);
router.post('/complete-phone-registration', completePhoneRegistration);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// Google OAuth
router.get('/google', initiateGoogleAuth);
router.get('/google/callback', handleGoogleCallback);

// Email verification & password recovery (public)
router.post('/verify-email', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout-all', authMiddleware, logoutAll);
router.get('/me', authMiddleware, getMe);
router.post('/send-verification-email', authMiddleware, sendVerificationEmail);

export default router;

