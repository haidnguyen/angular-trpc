# angular-trpc

## Install
```bash
npm i angular-trpc @trpc/server @trpc/client
```

## How to use

Basic example

```typescript
const { provideFn: provideTRPCClient, injectFn: injectTRPC } = createTRPCAngularClient<AppRouter>();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideTRPCClient(
      {
        url: '<Your tRPC endpoint here>',
      },
      // Optional
      withCredentials({ credentials: 'include' }),
      withHeaders({ headers: () => ({ Authorization: 'test' }) })
    ),
  ],
};
```

## Available configuration

The client can be configured by using following configuration function

### withHeaders

```typescript
provideTRPCClient(
  {
    url: '<your tRPC endpoint>',
  },
  withHeaders({ headers: () => ({ Authorization: 'TOKEN' }) })
);
```

### withCredentials

```typescript
provideTRPCClient(
  {
    url: '<your tRPC endpoint>',
  },
  withCredentials({ credentials: 'include' })
);
```
