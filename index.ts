import 'dotenv/config';
import express from 'express';
import prisma from './src/lib/prisma.ts';

const app = express();
app.use(express.json());

app.get('/users', async (_, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
