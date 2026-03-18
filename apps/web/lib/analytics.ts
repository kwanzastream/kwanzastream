/**
 * Analytics stub — Kwanza Stream
 *
 * Calls trackEvent() in CTAs but doesn't send data anywhere yet.
 * Replace the implementation body with your real analytics provider
 * (e.g. Plausible, PostHog, Umami) after launch.
 */

type EventProps = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, props?: EventProps) {
  if (typeof window === "undefined") return

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, props)
  }

  // TODO: send to your analytics provider
  // Example with Plausible:
  // window.plausible?.(name, { props })
  //
  // Example with PostHog:
  // posthog.capture(name, props)
}

/** Pre-defined event names for type safety */
export const EVENTS = {
  // Page views (auto-tracked by most providers)
  PAGE_VIEW: "page_view",

  // CTAs
  CTA_REGISTAR: "cta_registar",
  CTA_EXPLORAR: "cta_explorar",
  CTA_TRANSMITIR: "cta_transmitir",
  CTA_CRIAR_CANAL: "cta_criar_canal",

  // Content interaction
  STREAM_CARD_CLICK: "stream_card_click",
  VIDEO_CARD_CLICK: "video_card_click",
  CLIP_CARD_CLICK: "clip_card_click",
  CHANNEL_CARD_CLICK: "channel_card_click",
  CATEGORY_CLICK: "category_click",

  // Social
  WHATSAPP_SHARE: "whatsapp_share",

  // Map
  MAP_PROVINCE_CLICK: "map_province_click",

  // Schedule
  SCHEDULE_REMIND: "schedule_remind",

  // Radio
  RADIO_PLAY: "radio_play",
  RADIO_PAUSE: "radio_pause",
} as const
