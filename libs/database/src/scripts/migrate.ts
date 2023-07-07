import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '../lib/db';

migrate(db, { migrationsFolder: './migrations' })
  .then(() => {
    console.log('Migration completed!');
  })
  .catch(err => {
    console.log('Migration failed!', { err });
  });
