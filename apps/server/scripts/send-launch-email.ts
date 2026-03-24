/**
 * ============================================
 * Kwanza Stream — Launch Notification Script
 * ============================================
 *
 * Usage:
 *   npx ts-node scripts/send-launch-email.ts
 *
 * Env vars required:
 *   - DATABASE_URL
 *   - RESEND_API_KEY
 *   - RESEND_FROM_EMAIL (default: noreply@kwanzastream.com)
 *   - LAUNCH_URL (default: https://kwanzastream.com)
 */

import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Kwanza Stream <noreply@kwanzastream.com>';
const LAUNCH_URL = process.env.LAUNCH_URL || 'https://kwanzastream.com';
const BATCH_SIZE = 50;

if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is required. Set it in your .env file.');
    process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

function buildEmailHtml(email: string): string {
    return `
    <!DOCTYPE html>
    <html lang="pt-AO">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Outfit',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
              <!-- Header -->
              <tr>
                <td align="center" style="padding-bottom:30px;">
                  <img src="${LAUNCH_URL}/kwanza-logo-192.png" alt="Kwanza Stream" width="64" height="64" style="border-radius:12px;" />
                </td>
              </tr>
              <!-- Main -->
              <tr>
                <td style="background:linear-gradient(135deg,rgba(206,17,38,0.1),rgba(249,214,22,0.05));border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 30px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 16px;line-height:1.2;">
                    🚀 Estamos ao vivo!
                  </h1>
                  <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.6;margin:0 0 24px;">
                    A Kwanza Stream — a plataforma de streaming feita para Angola — está oficialmente ao vivo!
                    Prometemos avisar-te e aqui estamos. Entra agora e sê dos primeiros.
                  </p>
                  <a href="${LAUNCH_URL}" style="display:inline-block;background:linear-gradient(135deg,#CE1126,#a00d1e);color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:12px;box-shadow:0 0 20px rgba(206,17,38,0.3);">
                    Entrar na Kwanza Stream →
                  </a>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding-top:30px;text-align:center;">
                  <p style="color:rgba(255,255,255,0.2);font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0;">
                    © 2026 Kwanza Stream · Feito em Angola 🇦🇴
                  </p>
                  <p style="color:rgba(255,255,255,0.15);font-size:10px;margin:8px 0 0;">
                    Recebeste este email porque te inscreveste em ${email}.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;
}

async function main() {
    console.log('🚀 Kwanza Stream — Launch Email Notification Script');
    console.log('='.repeat(50));

    const totalPending = await prisma.preLaunchSubscriber.count({
        where: { notified: false },
    });

    if (totalPending === 0) {
        console.log('✅ No pending subscribers to notify. All done!');
        return;
    }

    console.log(`📧 Found ${totalPending} subscribers to notify.`);
    console.log(`📤 Sending in batches of ${BATCH_SIZE}...`);
    console.log('');

    let sent = 0;
    let failed = 0;

    while (true) {
        const batch = await prisma.preLaunchSubscriber.findMany({
            where: { notified: false },
            take: BATCH_SIZE,
            orderBy: { createdAt: 'asc' },
        });

        if (batch.length === 0) break;

        for (const sub of batch) {
            try {
                await resend.emails.send({
                    from: FROM_EMAIL,
                    to: sub.email,
                    subject: '🚀 Kwanza Stream está ao vivo! Entra agora.',
                    html: buildEmailHtml(sub.email),
                });

                await prisma.preLaunchSubscriber.update({
                    where: { id: sub.id },
                    data: { notified: true },
                });

                sent++;
                process.stdout.write(`\r  ✅ Sent: ${sent}/${totalPending} | ❌ Failed: ${failed}`);
            } catch (err: any) {
                failed++;
                console.error(`\n  ❌ Failed to send to ${sub.email}: ${err.message || err}`);
            }
        }

        // Small delay between batches to respect rate limits
        await new Promise((r) => setTimeout(r, 1000));
    }

    console.log('\n');
    console.log('='.repeat(50));
    console.log(`✅ Done! Sent: ${sent} | Failed: ${failed} | Total: ${totalPending}`);
}

main()
    .catch((err) => {
        console.error('Fatal error:', err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
