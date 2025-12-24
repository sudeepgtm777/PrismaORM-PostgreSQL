import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});
function normalizeSex(input: string): 'MALE' | 'FEMALE' | 'OTHER' {
  const val = input.toLowerCase();
  if (val === 'male') return 'MALE';
  if (val === 'female') return 'FEMALE';
  return 'OTHER';
}

async function main() {
  const users = [
    {
      email: 'sita@example.com',
      name: 'Sita',
      age: 30,
      sex: normalizeSex('female'),
      contact: '98765432101',
    },
    {
      email: 'ram@example.com',
      name: 'Ram',
      age: 25,
      sex: normalizeSex('male'),
      contact: '98765432102',
    },
    {
      email: 'hari@example.com',
      name: 'Hari',
      age: 20,
      sex: normalizeSex('male'),
      contact: '98765432103',
    },
    {
      email: 'gita@example.com',
      name: 'Gita',
      age: 28,
      sex: normalizeSex('female'),
      contact: '98765432104',
    },
    {
      email: 'suresh@example.com',
      name: 'Suresh',
      age: 32,
      sex: normalizeSex('male'),
      contact: '98765432105',
    },
    {
      email: 'manisha@example.com',
      name: 'Manisha',
      age: 22,
      sex: normalizeSex('female'),
      contact: '98765432106',
    },
    {
      email: 'pradeep@example.com',
      name: 'Pradeep',
      age: 27,
      sex: normalizeSex('male'),
      contact: '98765432107',
    },
    {
      email: 'anita@example.com',
      name: 'Anita',
      age: 24,
      sex: normalizeSex('female'),
      contact: '98765432108',
    },
    {
      email: 'binod@example.com',
      name: 'Binod',
      age: 29,
      sex: normalizeSex('male'),
      contact: '98765432109',
    },
    {
      email: 'sarita@example.com',
      name: 'Sarita',
      age: 21,
      sex: normalizeSex('female'),
      contact: '98765432110',
    },
  ];

  await prisma.user.createMany({
    data: users,
  });

  console.log('Users seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
