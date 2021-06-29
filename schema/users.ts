import { relationship, checkbox, text, password } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  fields: {
    name: text(),
    email: text(),
    password: password(),
    role: relationship({ ref: 'Role.users' }),
    authoredPosts: relationship({ ref: 'Post.author', many: true }),
    pollAnswers: relationship({
      ref: 'PollAnswer.answeredByUsers',
      many: true,
      ui: {
        hideCreate: true,
        createView: { fieldMode: 'hidden' },
      },
    }),
  },
});
export const Role = list({
  fields: {
    name: text(),
    canManageContent: checkbox({ defaultValue: false }),
    canManageUsers: checkbox({ defaultValue: false }),
    users: relationship({ ref: 'User.role', many: true }),
  },
});
