/**
 * scripts/create-first-admin.ts
 *
 * Promotes an existing user to super_admin.
 * Run: npx ts-node scripts/create-first-admin.ts
 * Prod: railway run npx ts-node scripts/create-first-admin.ts
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const targetUsername = process.argv[2] || 'kwanzastream';

  const user = await prisma.user.findUnique({ where: { username: targetUsername } });
  if (!user) {
    console.error(`❌ Utilizador @${targetUsername} não encontrado.`);
    console.error(`   Cria a conta primeiro em /registar, depois executa este script.`);
    process.exit(1);
  }

  const updated = await prisma.user.update({
    where: { username: targetUsername },
    data: {
      role: 'ADMIN',
    },
  });

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Super admin criado: @${updated.username}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Próximos passos:');
  console.log(`  1. Login em kwanzastream.ao/entrar com @${updated.username}`);
  console.log('  2. Activar 2FA em /auth/duas-etapas (OBRIGATÓRIO)');
  console.log('  3. Aceder ao painel admin em /admin');
  console.log('');
  console.log('⚠️  SEGURANÇA:');
  console.log('  - Nunca partilhes as credenciais deste utilizador');
  console.log('  - Activa 2FA ANTES de aceder ao painel admin');
  console.log('  - Em produção, configura IP whitelist no admin');
  console.log('');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Erro:', e);
  process.exit(1);
});
