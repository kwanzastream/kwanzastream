import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = bcrypt.hashSync('TestKwanza2026!', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'tester@kwanzastream.com' },
    update: {
      passwordHash: hash,
      username: 'ks-tester',
      role: 'USER',
    },
    create: {
      phone: '999111222', // required fake phone
      email: 'tester@kwanzastream.com',
      passwordHash: hash,
      username: 'ks-tester',
      role: 'USER',
    }
  });

  console.log('✅ Utilizador de teste (tester@kwanzastream.com) criado com sucesso via Prisma Client!');
  console.log('Hash da password:', hash);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
