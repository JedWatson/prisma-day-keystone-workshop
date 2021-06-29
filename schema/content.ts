import { relationship, select, text, timestamp } from '@keystone-next/fields';
import { document } from '@keystone-next/fields-document';
import { list } from '@keystone-next/keystone/schema';
import { rules } from './access';

import { componentBlocks } from './fields/content/components';

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

export const Post = list({
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
    intro: document({
      formatting: {
        inlineMarks: true,
        blockTypes: true,
        listTypes: true,
        softBreaks: true,
      },
      links: true,
    }),
    content: document({
      formatting: true,
      links: true,
      dividers: true,
      relationships: {
        poll: {
          listKey: 'Poll',
          kind: 'prop',
          selection: `
            id
            label
            responsesCount
            answers {
              id
              label
              voteCount
            }`,
        },
      },
      componentBlocks,
      ui: { views: require.resolve('./fields/content/components') },
    }),
  },
});
