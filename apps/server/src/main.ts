/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { trpcMiddleware } from '@angular-trpc/data-access/trpc-server';
import cors from 'cors';
import express from 'express';
import * as path from 'path';

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/trpc', trpcMiddleware);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
