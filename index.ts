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
app.get('/age', async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      /**** OR *****/
      where: { OR: [{ age: { gte: 30 } }, { sex: 'MALE' }] },

      /**** not *****/
      //   where: {
      //     sex: { not: 'MALE' },
      //   },

      /**** in *****/
      //   where: {
      //     sex: { in: ['MALE', 'FEMALE'] },
      //   },
      //   where: {
      //     sex: { in: ['MALE', 'FEMALE'] },
      //   },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.put('/users', async (_, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: 'ram@example.com' },
      data: {
        age: 35,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.delete('/users', async (_, res) => {
  try {
    // const deletedUser = await prisma.user.delete({
    //   where: { email: 'ram@example.com' },
    // });
    const deletedUser = await prisma.user.deleteMany({
      where: { age: { gte: 30 } },
    });
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
