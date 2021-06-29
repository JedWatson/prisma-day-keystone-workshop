import { relationship, text, virtual } from '@keystone-next/fields';
import { schema, KeystoneListsAPI, KeystoneDbAPI } from '@keystone-next/types';
import { list } from '@keystone-next/keystone/schema';
import { KeystoneListsTypeInfo } from '.keystone/types';

import { isSignedIn } from './access';

export const Poll = list({
  fields: {
    label: text(),
    answers: relationship({
      ref: 'PollAnswer.poll',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['label'],
        inlineCreate: {
          fields: ['label'],
        },
        inlineEdit: {
          fields: ['label'],
        },
        removeMode: 'disconnect',
      },
    }),
    responsesCount: virtual({
      field: schema.field({
        type: schema.Int,
        resolve(poll, args, context) {
          const lists =
            context.lists as KeystoneListsAPI<KeystoneListsTypeInfo>;
          return lists.User.count({
            where: {
              pollAnswers_some: { poll: { id: poll.id.toString() } },
            },
          });
        },
      }),
    }),
    userAnswer: virtual({
      field: lists =>
        schema.field({
          type: lists.PollAnswer.types.output,
          async resolve(poll, args, context) {
            if (!isSignedIn(context)) return null;
            const lists = context.db
              .lists as KeystoneDbAPI<KeystoneListsTypeInfo>;
            const pollAnswers = await lists.PollAnswer.findMany({
              where: {
                poll: { id: poll.id.toString() },
                answeredByUsers_some: { id: context.session.itemId },
              },
            });
            return pollAnswers[0];
          },
        }),
      graphQLReturnFragment: '{ id label }',
    }),
  },
});

export const PollAnswer = list({
  fields: {
    label: text(),
    poll: relationship({ ref: 'Poll.answers' }),
    answeredByUsers: relationship({
      ref: 'User.pollAnswers',
      many: true,
      ui: {
        displayMode: 'count',
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    voteCount: virtual({
      field: schema.field({
        type: schema.Int,
        resolve(pollAnswer, args, context) {
          const lists =
            context.lists as KeystoneListsAPI<KeystoneListsTypeInfo>;

          return lists.User.count({
            where: { pollAnswers_some: { id: pollAnswer.id.toString() } },
          });
        },
      }),
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
  },
});
