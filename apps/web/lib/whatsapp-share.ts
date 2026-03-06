/**
 * WhatsApp Share Utility — Cultural Curator (#17)
 *
 * WhatsApp is the #1 messaging app in Angola (85%+ penetration).
 * This utility generates WhatsApp share links for streams, profiles, and clips.
 */

const WHATSAPP_BASE = "https://wa.me/?text=";

/**
 * Generate a WhatsApp share URL
 */
export const whatsappShare = (text: string, url?: string): string => {
    const fullText = url ? `${text}\n\n${url}` : text;
    return `${WHATSAPP_BASE}${encodeURIComponent(fullText)}`;
};

/**
 * Share a live stream via WhatsApp
 */
export const shareStream = (title: string, streamerId: string, streamId: string): string => {
    const url = `${typeof window !== "undefined" ? window.location.origin : "https://kwanza-stream.ao"}/watch/${streamId}`;
    return whatsappShare(
        `🔴 AO VIVO no Kwanza Stream!\n\n${title}\n\nVem assistir:`,
        url
    );
};

/**
 * Share a user profile via WhatsApp
 */
export const shareProfile = (displayName: string, userId: string): string => {
    const url = `${typeof window !== "undefined" ? window.location.origin : "https://kwanza-stream.ao"}/profile/${userId}`;
    return whatsappShare(
        `Segue ${displayName} no Kwanza Stream! 🇦🇴`,
        url
    );
};

/**
 * Share the platform via WhatsApp (referral)
 */
export const sharePlatform = (referrerName?: string): string => {
    const url = typeof window !== "undefined" ? window.location.origin : "https://kwanza-stream.ao";
    const text = referrerName
        ? `${referrerName} convida-te para o Kwanza Stream — a plataforma de live streaming de Angola! 🇦🇴🎬`
        : "Conhece o Kwanza Stream — a primeira plataforma de live streaming de Angola! 🇦🇴🎬";
    return whatsappShare(text, url);
};

/**
 * Open WhatsApp share directly
 */
export const openWhatsAppShare = (text: string, url?: string): void => {
    const shareUrl = whatsappShare(text, url);
    if (typeof window !== "undefined") {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
};
