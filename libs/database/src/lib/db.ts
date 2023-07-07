import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  host: '127.0.0.1',
  port: 8080,
  user: 'postgres',
  password: 'password',
  database: 'conduit',
});

export const db = drizzle(pool, { logger: true });
