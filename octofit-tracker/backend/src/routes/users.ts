import { Router } from 'express';
import { UserModel } from '../models/User';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().sort({ displayName: 1 });

    response.json({
      resource: 'users',
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

export default router;