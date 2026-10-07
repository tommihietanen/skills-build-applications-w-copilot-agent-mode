import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ difficulty: 1, title: 1 });

    response.json({
      resource: 'workouts',
      data: workouts,
    });
  } catch (error) {
    next(error);
  }
});

export default router;