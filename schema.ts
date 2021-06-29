import {
  relationship,
  select,
  text,
  timestamp,
  password,
} from '@keystone-next/fields';
import { createSchema, list } from '@keystone-next/keystone/schema';

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
      authoredPosts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
  Post: list({
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
