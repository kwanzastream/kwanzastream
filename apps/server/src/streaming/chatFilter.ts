/**
 * Chat Word Filter — Content Moderation (Mindset 20)
 * 
 * Server-side filter for chat messages.
 * Blocks hate speech, slurs, spam patterns, and explicit content.
 * Includes Portuguese and Angolan-specific terms.
 */

// Blocked words/patterns (lowercase)
const BLOCKED_WORDS: string[] = [
    // Hate speech / slurs (Portuguese)
    'negro de merda', 'preto de merda', 'macaco',
    // Explicit sexual content
    'pornografia', 'sexo ao vivo',
    // Spam / scam
    'ganhe dinheiro fácil', 'clique aqui para ganhar',
    'bitcoin grátis', 'free money',
    // Violence
    'vou te matar', 'vou matar',
    // Platform abuse
    'raid', 'spam',
];

// Patterns that look like phishing/scam URLs
const SCAM_PATTERNS: RegExp[] = [
    /bit\.ly\/\w+/i,
    /tinyurl\.com\/\w+/i,
    /free.*money/i,
    /ganhe.*kwanza/i,
    /clique.*link/i,
    /whatsapp\.com\/\w+/i,
];

// Emoji spam: more than 10 consecutive emojis
const EMOJI_SPAM = /(?:[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]){10,}/u;

// Repeated character spam: aaaaaa, hahahahaha etc.
const REPEAT_SPAM = /(.)\1{9,}/i;

// ALL CAPS spam — ratio based (more than 70% uppercase in long messages)
const isCapsSpam = (msg: string): boolean => {
    if (msg.length < 30) return false;
    const letters = msg.replace(/[^a-zA-ZÀ-ÿ]/g, '');
    if (letters.length < 15) return false;
    const upper = letters.replace(/[^A-ZÀ-Ý]/g, '').length;
    return upper / letters.length > 0.7;
};

export interface FilterResult {
    allowed: boolean;
    reason?: string;
    filtered?: string;
}

/**
 * Filter a chat message for prohibited content.
 * Returns { allowed: true } if message passes, or { allowed: false, reason } if blocked.
 */
export const filterMessage = (message: string): FilterResult => {
    const lower = message.toLowerCase().trim();

    // Empty message
    if (!lower) {
        return { allowed: false, reason: 'Mensagem vazia' };
    }

    // Too long
    if (message.length > 500) {
        return { allowed: false, reason: 'Mensagem demasiado longa (max 500 chars)' };
    }

    // Blocked words check
    for (const word of BLOCKED_WORDS) {
        if (lower.includes(word)) {
            return { allowed: false, reason: 'Mensagem contém conteúdo proibido' };
        }
    }

    // Scam pattern check
    for (const pattern of SCAM_PATTERNS) {
        if (pattern.test(lower)) {
            return { allowed: false, reason: 'Links suspeitos não são permitidos' };
        }
    }

    // Emoji spam
    if (EMOJI_SPAM.test(message)) {
        return { allowed: false, reason: 'Demasiados emojis seguidos' };
    }

    // Repeated character spam
    if (REPEAT_SPAM.test(lower)) {
        return { allowed: false, reason: 'Spam de caracteres repetidos' };
    }

    // ALL CAPS spam
    if (isCapsSpam(message)) {
        return { allowed: false, reason: 'Não uses CAPS LOCK em excesso' };
    }

    return { allowed: true };
};
