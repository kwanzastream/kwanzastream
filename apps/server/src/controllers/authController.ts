/**
 * Auth Controller — Barrel re-export
 *
 * This file re-exports all auth functions from focused sub-modules.
 * The original 623-line monolith has been split into:
 * - auth/authHelpers.ts     — Cookie management, schemas, constants
 * - auth/otpController.ts   — OTP request & verification
 * - auth/loginController.ts — Registration, password login, tokens, getMe
 * - auth/passwordController.ts — Email verification, password recovery
 *
 * Route imports remain unchanged: import { ... } from '../controllers/authController'
 */

export { requestOtp, verifyOtpAndLogin, completePhoneRegistration } from './auth/otpController';
export { register, loginWithPassword, refreshAccessToken, logout, logoutAll, getMe } from './auth/loginController';
export { sendVerificationEmail, verifyEmail, requestPasswordReset, resetPassword } from './auth/passwordController';
