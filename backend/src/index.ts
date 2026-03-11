import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { PrismaClient, SwipeDirection, SwipeSource, MatchStatus } from '../generated/prisma';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

// Placeholder for proper Telegram initData verification
const initDataSchema = z.object({
  initData: z.string(),
});

app.post('/auth/telegram', async (req, res) => {
  const parsed = initDataSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid initData payload' });
  }

  // TODO: verify initData with Telegram bot token HMAC and extract user info.
  // For now, accept a simple dev payload.
  const { initData } = parsed.data;

  const tgId = initData;

  let user = await prisma.user.findUnique({ where: { tgId } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        tgId,
      },
    });
  }

  return res.json({ userId: user.id });
});

app.get('/me', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      preferences: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
});

app.put('/profile/me', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const body = req.body;

  const profile = await prisma.playerProfile.upsert({
    where: { userId },
    update: body,
    create: {
      userId,
      nickname: body.nickname ?? 'Player',
      mainGame: body.mainGame ?? 'CS2',
      region: body.region ?? 'EU',
      languages: body.languages ?? ['en'],
    },
  });

  return res.json(profile);
});

app.get('/profile/me', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const profile = await prisma.playerProfile.findUnique({
    where: { userId },
  });

  return res.json(profile);
});

app.put('/preferences/me', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const body = req.body;

  const prefs = await prisma.preferences.upsert({
    where: { userId },
    update: body,
    create: {
      userId,
      games: body.games ?? ['CS2'],
      regions: body.regions ?? ['EU'],
      languages: body.languages ?? ['en'],
      preferredRoles: body.preferredRoles ?? [],
      competitiveLevel: body.competitiveLevel ?? 50,
    },
  });

  return res.json(prefs);
});

app.get('/preferences/me', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const prefs = await prisma.preferences.findUnique({
    where: { userId },
  });

  return res.json(prefs);
});

app.get('/candidates', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      preferences: true,
    },
  });

  if (!currentUser || !currentUser.preferences) {
    return res.json([]);
  }

  const prefs = currentUser.preferences;

  const candidates = await prisma.playerProfile.findMany({
    where: {
      userId: { not: userId },
      region: { in: prefs.regions },
      languages: { hasSome: prefs.languages },
    },
    take: 20,
  });

  return res.json(candidates);
});

app.post('/swipes', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const { targetUserId, direction } = req.body as {
    targetUserId: string;
    direction: 'LIKE' | 'DISLIKE';
  };

  if (!targetUserId || !direction) {
    return res.status(400).json({ error: 'targetUserId and direction are required' });
  }

  const swipe = await prisma.swipe.upsert({
    where: {
      fromUserId_toUserId: {
        fromUserId: userId,
        toUserId: targetUserId,
      },
    },
    update: { direction: direction as SwipeDirection },
    create: {
      fromUserId: userId,
      toUserId: targetUserId,
      direction: direction as SwipeDirection,
      source: SwipeSource.DISCOVER,
    },
  });

  let matchCreated = false;

  if (direction === 'LIKE') {
    const reciprocal = await prisma.swipe.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: targetUserId,
          toUserId: userId,
        },
      },
    });

    if (reciprocal && reciprocal.direction === SwipeDirection.LIKE) {
      await prisma.match.upsert({
        where: {
          userAId_userBId: {
            userAId: userId,
            userBId: targetUserId,
          },
        },
        update: {
          status: MatchStatus.ACTIVE,
        },
        create: {
          userAId: userId,
          userBId: targetUserId,
          status: MatchStatus.ACTIVE,
        },
      });
      matchCreated = true;
    }
  }

  return res.json({ swipe, matchCreated });
});

app.get('/matches', async (req, res) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }

  const matches = await prisma.match.findMany({
    where: {
      status: MatchStatus.ACTIVE,
      OR: [{ userAId: userId }, { userBId: userId }],
    },
    include: {
      userA: { include: { profile: true } },
      userB: { include: { profile: true } },
    },
  });

  return res.json(
    matches.map((m) => {
      const teammate =
        m.userAId === userId ? m.userB : m.userA;

      return {
        id: m.id,
        teammateId: teammate.id,
        teammateProfile: teammate.profile,
        createdAt: m.createdAt,
      };
    })
  );
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`GGMatch backend running on http://localhost:${port}`);
});

