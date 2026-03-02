import nodemailer from 'nodemailer';

// ============== Configuration ==============

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Kwanza Stream';
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@kwanzastream.ao';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const IS_CONFIGURED = !!(SMTP_HOST && SMTP_USER && SMTP_PASS);

// Create transporter (real or ethereal for dev)
const transporter = IS_CONFIGURED
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    : null;

// ============== Email Templates ==============

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:480px;margin:0 auto;padding:40px 24px">
  <div style="text-align:center;margin-bottom:32px">
    <div style="display:inline-block;background:#7c3aed;color:white;font-weight:900;font-size:20px;width:48px;height:48px;line-height:48px;border-radius:12px">K</div>
    <p style="color:#a1a1aa;font-size:12px;margin-top:8px;letter-spacing:2px;text-transform:uppercase">Kwanza Stream</p>
  </div>
  <div style="background:#111;border:1px solid #222;border-radius:16px;padding:32px;color:#fff">
    ${content}
  </div>
  <p style="color:#555;font-size:11px;text-align:center;margin-top:24px">
    © ${new Date().getFullYear()} Kwanza Stream. Todos os direitos reservados.
  </p>
</div>
</body>
</html>
`;

const verificationTemplate = (name: string, link: string) => baseTemplate(`
  <h2 style="margin:0 0 16px;font-size:20px;color:#fff">Verifica o teu email 📧</h2>
  <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px">
    Olá <strong style="color:#fff">${name}</strong>, clica no botão abaixo para verificar o teu endereço de email.
  </p>
  <a href="${link}" style="display:block;background:#7c3aed;color:white;text-decoration:none;text-align:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:14px">
    Verificar Email
  </a>
  <p style="color:#555;font-size:11px;margin-top:16px">
    Se não pediste esta verificação, podes ignorar este email. O link expira em 24 horas.
  </p>
`);

const passwordResetTemplate = (name: string, link: string) => baseTemplate(`
  <h2 style="margin:0 0 16px;font-size:20px;color:#fff">Repor a tua senha 🔑</h2>
  <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px">
    Olá <strong style="color:#fff">${name}</strong>, alguém pediu para repor a senha da tua conta. Se foste tu, clica no botão abaixo.
  </p>
  <a href="${link}" style="display:block;background:#7c3aed;color:white;text-decoration:none;text-align:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:14px">
    Repor Senha
  </a>
  <p style="color:#555;font-size:11px;margin-top:16px">
    Se não pediste isto, ignora este email. O link expira em 1 hora.
  </p>
`);

const loginAlertTemplate = (name: string, device: string, ip: string) => baseTemplate(`
  <h2 style="margin:0 0 16px;font-size:20px;color:#fff">Novo login detectado 🔔</h2>
  <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 16px">
    Olá <strong style="color:#fff">${name}</strong>, detectámos um novo login na tua conta:
  </p>
  <div style="background:#1a1a1a;border-radius:8px;padding:16px;margin-bottom:16px">
    <p style="color:#a1a1aa;font-size:13px;margin:0 0 4px">📱 Dispositivo: <strong style="color:#fff">${device}</strong></p>
    <p style="color:#a1a1aa;font-size:13px;margin:0">🌐 IP: <strong style="color:#fff">${ip}</strong></p>
  </div>
  <p style="color:#555;font-size:11px">
    Se não foste tu, altera a tua senha imediatamente e contacta o suporte.
  </p>
`);

// ============== Send Functions ==============

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

const sendEmail = async (options: SendEmailOptions): Promise<boolean> => {
    if (!IS_CONFIGURED || !transporter) {
        console.log('\n📧 [EMAIL DEV MODE] ─────────────────────────');
        console.log(`   Para: ${options.to}`);
        console.log(`   Assunto: ${options.subject}`);
        console.log('   (SMTP não configurado — email simulado)');
        console.log('────────────────────────────────────────────\n');
        return true; // Simulate success in dev
    }

    try {
        await transporter.sendMail({
            from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });
        return true;
    } catch (error) {
        console.error('[Email] Send error:', error);
        return false;
    }
};

// ============== Public API ==============

export const emailService = {
    sendVerification: (to: string, name: string, token: string) => {
        const link = `${FRONTEND_URL}/auth/verificar-email?token=${token}`;
        console.log(`📧 [Email Verification] Link: ${link}`);
        return sendEmail({
            to,
            subject: 'Verifica o teu email — Kwanza Stream',
            html: verificationTemplate(name, link),
        });
    },

    sendPasswordReset: (to: string, name: string, token: string) => {
        const link = `${FRONTEND_URL}/auth/recuperar?token=${token}`;
        console.log(`🔑 [Password Reset] Link: ${link}`);
        return sendEmail({
            to,
            subject: 'Repor senha — Kwanza Stream',
            html: passwordResetTemplate(name, link),
        });
    },

    sendLoginAlert: (to: string, name: string, device: string, ip: string) => {
        return sendEmail({
            to,
            subject: 'Novo login na tua conta — Kwanza Stream',
            html: loginAlertTemplate(name, device, ip),
        });
    },
};
