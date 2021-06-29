import { config } from '@keystone-next/keystone/schema';

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres://${process.env.USER}@localhost/prisma-keystone-workshop`;

import { lists } from './schema';

export default config({
  db: {
    url: dbUrl,
    provider: 'postgresql',
    useMigrations: true,
  },
  lists,
});
