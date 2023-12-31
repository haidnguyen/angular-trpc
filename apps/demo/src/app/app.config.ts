import { provideTRPCClient } from '@angular-trpc/data-access/trpc-client';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { withCredentials, withHeaders } from 'angular-trpc';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideTRPCClient(
      {
        url: 'http://localhost:3333/trpc',
      },
      withCredentials({ credentials: 'include' }),
      withHeaders({ headers: () => ({ Authorization: 'test' }) })
    ),
  ],
};
