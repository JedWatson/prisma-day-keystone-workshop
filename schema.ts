import { createSchema } from '@keystone-next/keystone/schema';
import { Post } from './schema/content';
import { User, Role } from './schema/users';
import { Poll, PollAnswer } from './schema/polls';

export const lists = createSchema({
  Post,
  User,
  Role,
  Poll,
  PollAnswer,
});
