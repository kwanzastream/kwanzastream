/**
 * SMS Service — Multi-provider implementation
 * 
 * Supports multiple SMS providers via SMS_PROVIDER env var:
 * - 'mock': Console logging only (development)
 * - 'africastalking': Africa's Talking API (recommended for Angola/Africa)
 * - 'twilio': Twilio API (alternative)
 * 
 * PR #4: feat/sms-provider-sandbox (F-007 fix)
 */

interface SendSmsResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

const SMS_PROVIDER = process.env.SMS_PROVIDER || 'mock';

// ============== PHONE NORMALIZATION ==============

/**
 * Normalize Angolan phone numbers to international format (+244XXXXXXXXX)
 * Handles: 912345678, 0912345678, 244912345678, +244912345678
 */
function normalizeAngolanPhone(phone: string): string {
    // Remove spaces, dashes, parentheses
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');

    // Already in +244 format
    if (cleaned.startsWith('+244')) return cleaned;

    // Starts with 244 (no +)
    if (cleaned.startsWith('244') && cleaned.length === 12) return '+' + cleaned;

    // Starts with 0 (local format: 0912345678)
    if (cleaned.startsWith('0') && cleaned.length === 10) {
        return '+244' + cleaned.slice(1);
    }

    // Starts with 9 (short format: 912345678)
    if (cleaned.startsWith('9') && cleaned.length === 9) {
        return '+244' + cleaned;
    }

    // Fallback: return as-is (may be international number)
    return cleaned.startsWith('+') ? cleaned : '+' + cleaned;
}

// ============== PROVIDER IMPLEMENTATIONS ==============

/**
 * Mock SMS — logs to console only. For development.
 */
const sendSmsMock = async (phone: string, message: string): Promise<SendSmsResult> => {
    console.log(`\n📱 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📱 SMS para: ${phone}`);
    console.log(`📱 Mensagem: ${message}`);
    console.log(`📱 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    return { success: true, messageId: `mock-${Date.now()}` };
};

/**
 * Africa's Talking SMS — sandbox and production.
 * 
 * Setup:
 * 1. Sign up at https://africastalking.com
 * 2. Get API key from dashboard
 * 3. Set env vars: AT_API_KEY, AT_USERNAME (use 'sandbox' for testing)
 * 
 * Note: Africa's Talking sandbox uses port 443 and doesn't actually send SMS,
 * but provides realistic API responses including DLR callbacks.
 */
const sendSmsAfricasTalking = async (phone: string, message: string): Promise<SendSmsResult> => {
    const apiKey = process.env.AT_API_KEY;
    const username = process.env.AT_USERNAME || 'sandbox';

    if (!apiKey) {
        console.error('[SMS] AT_API_KEY not set — falling back to mock');
        return sendSmsMock(phone, message);
    }

    try {
        const normalized = normalizeAngolanPhone(phone);
        const baseUrl = username === 'sandbox'
            ? 'https://api.sandbox.africastalking.com'
            : 'https://api.africastalking.com';

        const body = new URLSearchParams({
            username,
            to: normalized,
            message,
            ...(username !== 'sandbox' && { from: process.env.AT_SMS_SENDER || 'KwanzaStream' }),
        });

        const response = await fetch(`${baseUrl}/version1/messaging`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'apiKey': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[SMS] Africa\'s Talking error:', data);
            return { success: false, error: data.message || 'SMS sending failed' };
        }

        const recipients = data.SMSMessageData?.Recipients;
        if (recipients && recipients.length > 0) {
            const recipient = recipients[0];
            const success = recipient.statusCode === 101; // 101 = sent to network
            
            // In sandbox mode, treat any response as success
            if (username === 'sandbox') {
                console.log('[SMS Sandbox]', { to: normalized, status: recipient.status, messageId: recipient.messageId });
                return { success: true, messageId: recipient.messageId || `sandbox-${Date.now()}` };
            }

            return {
                success,
                messageId: recipient.messageId,
                error: success ? undefined : recipient.status,
            };
        }

        // Sandbox may return empty recipients — still success
        if (username === 'sandbox') {
            console.log('[SMS Sandbox] No recipients in response, but sandbox mode — treating as success');
            return { success: true, messageId: `sandbox-${Date.now()}` };
        }

        return { success: false, error: 'No recipients in response' };
    } catch (error: any) {
        console.error('[SMS] Africa\'s Talking exception:', error);

        // In development, don't block flow if SMS fails
        if (process.env.NODE_ENV !== 'production') {
            console.warn(`[SMS Dev Fallback] OTP seria enviado para ${phone}`);
            return { success: true, messageId: 'dev-fallback' };
        }

        return { success: false, error: error.message };
    }
};

/**
 * Twilio SMS — for international coverage.
 * 
 * Setup:
 * 1. Sign up at https://twilio.com
 * 2. Get Account SID, Auth Token, and a phone number
 * 3. Set env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
 */
const sendSmsTwilio = async (phone: string, message: string): Promise<SendSmsResult> => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
        console.error('[SMS] Twilio credentials not set — falling back to mock');
        return sendSmsMock(phone, message);
    }

    try {
        const normalized = normalizeAngolanPhone(phone);
        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
                },
                body: new URLSearchParams({
                    To: normalized,
                    From: fromNumber,
                    Body: message,
                }).toString(),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Twilio SMS failed' };
        }

        return { success: true, messageId: data.sid };
    } catch (error: any) {
        console.error('[SMS] Twilio exception:', error);
        return { success: false, error: error.message };
    }
};

// ============== PUBLIC API ==============

/**
 * Send an SMS using the configured provider.
 * Falls back to mock if the configured provider fails to initialize.
 */
export const sendSms = async (phone: string, message: string): Promise<SendSmsResult> => {
    switch (SMS_PROVIDER) {
        case 'africastalking':
            return sendSmsAfricasTalking(phone, message);
        case 'twilio':
            return sendSmsTwilio(phone, message);
        case 'mock':
        default:
            return sendSmsMock(phone, message);
    }
};

/**
 * Send OTP SMS with standard message format.
 */
export const sendOtpSms = async (phone: string, code: string): Promise<SendSmsResult> => {
    const message = `O teu código de verificação Kwanza Stream é: ${code}. Válido por 5 minutos. Não partilhes este código.`;
    return sendSms(phone, message);
};

/** Re-export for use in other services */
export { normalizeAngolanPhone };

