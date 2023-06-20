import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = async (context: trpcExpress.CreateExpressContextOptions) => {
  return {
    res: context.res,
    req: context.req,
  };
};

const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create();

export const procedure = t.procedure;
export const router = t.router;
