import { Router } from 'express';
import { LeaderboardModel } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('user', 'username displayName')
      .sort({ rank: 1 });

    response.json({
      resource: 'leaderboard',
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
});

export default router;