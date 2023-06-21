import { InjectionToken, Provider, inject } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';
import { createRecursiveProxy } from '@trpc/server/shared';
import {
  ObservableProcedureRecord,
  TRPCBaseConfig,
  TRPCConfiguration,
  isCredentialConfig,
  isHeaderConfig,
} from './type';
import { fromProcedure } from './utils';

export const createTRPCAngularClient = <TRouter extends AnyRouter>() => {
  const trpcClient = new InjectionToken<ObservableProcedureRecord<TRouter['_def']['record']>>(
    '__ANGULAR_TRPC_CLIENT__'
  );

  const provideFn = (config: TRPCBaseConfig, ...extraConfigurations: TRPCConfiguration[]): Provider => {
    const credentialsConfig = extraConfigurations.find(isCredentialConfig);
    const headersConfig = extraConfigurations.find(isHeaderConfig);
    const client = createTRPCProxyClient({
      links: [
        httpBatchLink({
          url: config.url,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              ...(credentialsConfig ? { credentials: credentialsConfig.credentials } : {}),
            });
          },
          headers() {
            return headersConfig ? headersConfig.headers() : {};
          },
        }),
      ],
    });
    return {
      provide: trpcClient,
      useFactory: () => {
        const proxy = createRecursiveProxy(({ path, args }) => {
          return path.reduce((acc, currentPath, index) => {
            if (index === path.length - 1) {
              return fromProcedure(acc[currentPath])(...args);
            }
            return acc[currentPath];
          }, client as any);
        });
        return proxy;
      },
    };
  };

  const injectFn = () => inject(trpcClient);

  return { provideFn, injectFn, trpcClient } as const;
};
