import type { AppRouter } from '@angular-trpc/data-access/trpc-server';
import { createTRPCAngularClient } from 'angular-trpc';

const { provideFn, injectFn } = createTRPCAngularClient<AppRouter>();

export const provideTRPCClient = provideFn;
export const injectTRPC = injectFn;
