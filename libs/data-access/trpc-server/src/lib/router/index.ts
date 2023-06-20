import { router } from '../core';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
});
