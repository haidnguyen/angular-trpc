import { InjectionToken, Provider, inject } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type {
  AnyMutationProcedure,
  AnyProcedure,
  AnyQueryProcedure,
  AnyRouter,
  ProcedureArgs,
  ProcedureRouterRecord,
} from '@trpc/server';
import { createRecursiveProxy, inferTransformedProcedureOutput } from '@trpc/server/shared';
import { Observable, from } from 'rxjs';

export interface TRPCConfig {
  url: string;
}

type ObservableProcedure<TProcedure extends AnyProcedure> = (
  ...args: ProcedureArgs<TProcedure['_def']>
) => Observable<inferTransformedProcedureOutput<TProcedure>>;

type QueryOrMutateObservableProcedure<TProcedure extends AnyProcedure> = TProcedure extends AnyQueryProcedure
  ? { query: ObservableProcedure<TProcedure> }
  : TProcedure extends AnyMutationProcedure
  ? { mutate: ObservableProcedure<TProcedure> }
  : never;

type ObservableProcedureRecord<TProcedure extends ProcedureRouterRecord> = {
  [TKey in keyof TProcedure]: TProcedure[TKey] extends AnyRouter
    ? ObservableProcedureRecord<TProcedure[TKey]['_def']['record']>
    : TProcedure[TKey] extends AnyProcedure
    ? QueryOrMutateObservableProcedure<TProcedure[TKey]>
    : never;
};

export const createTRPCAngularClient = <TRouter extends AnyRouter>() => {
  const ANGULAR_TRPC_CLIENT = new InjectionToken<ObservableProcedureRecord<TRouter['_def']['record']>>(
    '__ANGULAR_TRPC_CLIENT__'
  );

  const provideFn = (config: TRPCConfig): Provider => {
    const client = createTRPCProxyClient({
      links: [
        httpBatchLink({
          url: config.url,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' });
          },
        }),
      ],
    });
    return {
      provide: ANGULAR_TRPC_CLIENT,
      useFactory: () => {
        const proxy = createRecursiveProxy(({ path, args }) => {
          return path.reduce((acc, currentPath, index) => {
            if (index === path.length - 1) {
              return from(acc[currentPath](...args));
            }
            return acc[currentPath];
          }, client as any);
        });
        return proxy;
      },
    };
  };

  const injectFn = () => inject(ANGULAR_TRPC_CLIENT);

  return { provideFn, injectFn } as const;
};
