/**
 * usePostHogEvents — Custom hook for tracking key platform events
 * 
 * Wraps PostHog capture calls with typed events for beta metrics.
 * Only fires if NEXT_PUBLIC_POSTHOG_KEY is set.
 */

import { trackEvent, identifyUser } from './posthog';

// ============== Auth Events ==============

export const useAuthEvents = () => ({
    /** Fires after successful registration */
    trackRegistration: (method: 'password' | 'otp') => {
        trackEvent('user_registered', { method });
    },

    /** Fires after successful login */
    trackLogin: (method: 'password' | 'otp', userId: string) => {
        identifyUser(userId);
        trackEvent('user_logged_in', { method });
    },

    /** Fires on logout */
    trackLogout: () => {
        trackEvent('user_logged_out');
    },
});

// ============== Stream Events ==============

export const useStreamEvents = () => ({
    /** Fires when a stream is created */
    trackStreamCreated: (category: string) => {
        trackEvent('stream_created', { category });
    },

    /** Fires when viewer joins a stream */
    trackStreamViewed: (streamId: string, streamerId: string) => {
        trackEvent('stream_viewed', { streamId, streamerId });
    },

    /** Fires when viewer leaves a stream */
    trackStreamLeft: (streamId: string, watchTimeSeconds: number) => {
        trackEvent('stream_left', { streamId, watchTimeSeconds });
    },
});

// ============== Social Events ==============

export const useSocialEvents = () => ({
    /** Follow/unfollow */
    trackFollow: (targetUserId: string) => {
        trackEvent('user_followed', { targetUserId });
    },

    trackUnfollow: (targetUserId: string) => {
        trackEvent('user_unfollowed', { targetUserId });
    },

    /** Chat message sent */
    trackChatMessage: (streamId: string) => {
        trackEvent('chat_message_sent', { streamId });
    },
});

// ============== Financial Events ==============

export const useFinancialEvents = () => ({
    /** Salo (donation) sent */
    trackSaloSent: (amount: number, type: string) => {
        trackEvent('salo_sent', { amount, type });
    },

    /** Deposit initiated */
    trackDepositInitiated: (amount: number) => {
        trackEvent('deposit_initiated', { amount });
    },

    /** Withdrawal requested */
    trackWithdrawalRequested: (amount: number) => {
        trackEvent('withdrawal_requested', { amount });
    },
});
