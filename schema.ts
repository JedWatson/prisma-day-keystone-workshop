import {
  relationship,
  checkbox,
  select,
  text,
  timestamp,
  password,
} from '@keystone-next/fields';
import { createSchema, list } from '@keystone-next/keystone/schema';
import { rules } from './schema/access';

function defaultSlug({ context, originalInput }: any) {
  const date = new Date();
  return `${
    originalInput?.title
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, '')
      ?.replace(/ +/g, '-') ?? ''
  }-${date?.getFullYear() ?? ''}${date?.getMonth() + 1 ?? ''}${
    date?.getDate() ?? ''
  }`;
}

function defaultTimestamp() {
  return new Date().toISOString();
}

export const lists = createSchema({
  User: list({
    fields: {
      name: text(),
      email: text(),
      password: password(),
      role: relationship({ ref: 'Role.users' }),
      authoredPosts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
  Role: list({
    fields: {
      name: text(),
      canManageContent: checkbox({ defaultValue: false }),
      canManageUsers: checkbox({ defaultValue: false }),
      users: relationship({ ref: 'User.role', many: true }),
    },
  }),
  Post: list({
    access: {
      read: rules.canReadContentList,
    },
    fields: {
      title: text(),
      slug: text({
        defaultValue: defaultSlug,
        ui: { createView: { fieldMode: 'hidden' } },
        isUnique: true,
      }),
      status: select({
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
      }),
      publishedDate: timestamp({
        defaultValue: defaultTimestamp,
      }),
      author: relationship({ ref: 'User.authoredPosts' }),
    },
  }),
});
