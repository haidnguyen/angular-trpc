import { z } from 'zod';
import { procedure, router } from '../core';

const listUserProcedure = procedure.input(z.string()).query(async ({ ctx, input }) => {
  return { input };
});

export const userRouter = router({
  list: listUserProcedure,
});
