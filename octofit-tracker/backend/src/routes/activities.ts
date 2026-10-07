import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'username displayName')
      .sort({ performedAt: -1 });

    response.json({
      resource: 'activities',
      data: activities,
    });
  } catch (error) {
    next(error);
  }
});

export default router;