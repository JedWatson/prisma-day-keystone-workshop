import { config } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres://${process.env.USER}@localhost/prisma-keystone-workshop`;

const sessionSecret =
  process.env.SESSION_SECERT ||
  'iLqbHhm7qwiBNc8KgL4NQ8tD8fFVhNhNqZ2nRdprgnKNjgJHgvitWx6DPoZJpYHa';

const auth = createAuth({
  identityField: 'email',
  secretField: 'password',
  listKey: 'User',
  sessionData: `id name role {
        canManageContent
        canManageUsers
      }`,
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: {
      role: {
        create: {
          name: 'Super User',
          canManageContent: true,
          canManageUsers: true,
        },
      },
    },
  },
});

import { lists } from './schema';
import { rules } from './schema/access';

export default auth.withAuth(
  config({
    db: {
      url: dbUrl,
      provider: 'postgresql',
      useMigrations: true,
    },
    ui: { isAccessAllowed: rules.canUseAdminUI },
    session: statelessSessions({
      secret: sessionSecret,
    }),
    lists,
  })
);
