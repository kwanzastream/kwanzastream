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
        const baseUrl = username === 'sandbox'
            ? 'https://api.sandbox.africastalking.com'
            : 'https://api.africastalking.com';

        const body = new URLSearchParams({
            username,
            to: phone,
            message,
            from: 'KwanzaStream',
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
            return {
                success,
                messageId: recipient.messageId,
                error: success ? undefined : recipient.status,
            };
        }

        return { success: false, error: 'No recipients in response' };
    } catch (error: any) {
        console.error('[SMS] Africa\'s Talking exception:', error);
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
        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
                },
                body: new URLSearchParams({
                    To: phone,
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
    const message = `Seu código Kwanza Stream é: ${code}. Válido por 5 minutos. Não partilhe este código.`;
    return sendSms(phone, message);
};
