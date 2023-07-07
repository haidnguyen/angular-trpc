import type { Config } from 'drizzle-kit';

export default {
  schema: './libs/database/src/lib/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://postgres:password@127.0.0.1:8080/conduit',
  },
} satisfies Config;
