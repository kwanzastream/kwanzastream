/**
 * Feature Flags — Iteration Mindset (#11)
 *
 * Simple, zero-dependency feature flag system for gradual rollout.
 * Flags are checked client-side from env vars or a static config.
 * Can be upgraded to PostHog feature flags later.
 */

// Feature flag definitions with defaults
const FLAGS = {
    /** Enable Salo donations system */
    SALO_ENABLED: true,

    /** Enable clips creation */
    CLIPS_ENABLED: false,

    /** Enable direct messages */
    DM_ENABLED: false,

    /** Enable Multicaixa payments (needs EMIS sandbox) */
    PAYMENTS_ENABLED: false,

    /** Enable beta feedback widget */
    BETA_FEEDBACK: true,

    /** Enable PostHog analytics */
    ANALYTICS_ENABLED: true,

    /** Enable streamer leaderboard */
    LEADERBOARD_ENABLED: true,

    /** Enable events/scheduling */
    EVENTS_ENABLED: false,

    /** Enable ads system */
    ADS_ENABLED: false,
} as const;

export type FeatureFlag = keyof typeof FLAGS;

/**
 * Check if a feature flag is enabled.
 * First checks env var NEXT_PUBLIC_FF_{FLAG_NAME}, then falls back to static config.
 */
export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
    // Check env var override (e.g., NEXT_PUBLIC_FF_SALO_ENABLED=true)
    if (typeof window !== "undefined") {
        const envKey = `NEXT_PUBLIC_FF_${flag}`;
        const envVal = process.env[envKey];
        if (envVal === "true") return true;
        if (envVal === "false") return false;
    }

    return FLAGS[flag];
};

/**
 * React hook for feature flags
 */
export const useFeatureFlag = (flag: FeatureFlag): boolean => {
    return isFeatureEnabled(flag);
};

/**
 * Get all flags with their current values (for debugging)
 */
export const getAllFlags = (): Record<FeatureFlag, boolean> => {
    const result: Record<string, boolean> = {};
    for (const flag of Object.keys(FLAGS) as FeatureFlag[]) {
        result[flag] = isFeatureEnabled(flag);
    }
    return result as Record<FeatureFlag, boolean>;
};
