// SMS Service - Mock implementation for development
// Replace with Twilio or Afrika's Talking in production

const SMS_PROVIDER = process.env.SMS_PROVIDER || 'mock';

interface SendSmsResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

export const sendSms = async (phone: string, message: string): Promise<SendSmsResult> => {
    if (SMS_PROVIDER === 'mock') {
        console.log(`📱 [MOCK SMS] To: ${phone}`);
        console.log(`📱 [MOCK SMS] Message: ${message}`);
        return { success: true, messageId: `mock-${Date.now()}` };
    }

    if (SMS_PROVIDER === 'twilio') {
        return sendViaTwilio(phone, message);
    }

    return { success: false, error: 'Unknown SMS provider' };
};

const sendViaTwilio = async (phone: string, message: string): Promise<SendSmsResult> => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;

        if (!accountSid || !authToken || !fromNumber) {
            return { success: false, error: 'Twilio credentials not configured' };
        }

        // Dynamic import to avoid loading Twilio if not needed
        const twilio = await import('twilio');
        const client = twilio.default(accountSid, authToken);

        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to: phone,
        });

        return { success: true, messageId: result.sid };
    } catch (error: any) {
        console.error('Twilio error:', error);
        return { success: false, error: error.message };
    }
};

export const sendOtpSms = async (phone: string, code: string): Promise<SendSmsResult> => {
    const message = `Seu código Kwanza Stream é: ${code}. Válido por 5 minutos.`;
    return sendSms(phone, message);
};
