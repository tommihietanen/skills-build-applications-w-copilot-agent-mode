import { Router } from 'express';
import { TeamModel } from '../models/Team';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const teams = await TeamModel.find().populate('members', 'username displayName').sort({ name: 1 });

    response.json({
      resource: 'teams',
      data: teams,
    });
  } catch (error) {
    next(error);
  }
});

export default router;