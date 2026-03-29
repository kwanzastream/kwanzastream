"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    const hasKey = !!POSTHOG_KEY;

    useEffect(() => {
        if (hasKey && typeof window !== "undefined") {
            posthog.init(POSTHOG_KEY!, {
                api_host: POSTHOG_HOST,
                person_profiles: "identified_only",
                capture_pageview: true,
                capture_pageleave: true,
                // Africa-first: respect data costs
                disable_session_recording: true,
                autocapture: false,
            });
        }
    }, [hasKey]);

    // Always render children — only wrap in PHProvider when key is available
    if (!hasKey) {
        return <>{children}</>;
    }

    return <PHProvider client={posthog}>{children}</PHProvider>;
}

// Track custom events for beta metrics
export const trackEvent = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined" && POSTHOG_KEY) {
        posthog.capture(event, properties);
    }
};

// Identify user after login (for cohort analysis)
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined" && POSTHOG_KEY) {
        posthog.identify(userId, properties);
    }
};

export const resetUser = () => {
    if (typeof window !== "undefined" && POSTHOG_KEY) {
        posthog.reset();
    }
};
