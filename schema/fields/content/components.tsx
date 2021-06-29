/** @jsxRuntime classic */
/** @jsx jsx */

import {
  component,
  fields,
  NotEditable,
} from '@keystone-next/fields-document/component-blocks';
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@keystone-next/fields-document/primitives';
import { jsx, useTheme } from '@keystone-ui/core';
import { Tooltip } from '@keystone-ui/tooltip';

import { InfoIcon } from '@keystone-ui/icons/icons/InfoIcon';
import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';
import { AlertOctagonIcon } from '@keystone-ui/icons/icons/AlertOctagonIcon';
import { CheckCircleIcon } from '@keystone-ui/icons/icons/CheckCircleIcon';
import { Trash2Icon } from '@keystone-ui/icons/icons/Trash2Icon';

const appearances = {
  info: {
    icon: InfoIcon,
    backgroundColor: '#E0F2FE',
    borderColor: '#38BDF8',
    foregroundColor: '#0C4A6E',
  },
  error: {
    icon: AlertOctagonIcon,
    backgroundColor: '#FFE4E6',
    borderColor: '#FB7185',
    foregroundColor: '#881337',
  },
  warning: {
    icon: AlertTriangleIcon,
    backgroundColor: '#FEF3C7',
    borderColor: '#FBBF24',
    foregroundColor: '#78350F',
  },
  success: {
    icon: CheckCircleIcon,
    backgroundColor: '#D1FAE5',
    borderColor: '#34D399',
    foregroundColor: '#064E3B',
  },
} as const;

export const componentBlocks = {
  callout: component({
    component: function Callout({ appearance, content }) {
      const appearanceConfig = appearances[appearance.value];
      const { radii, spacing } = useTheme();
      return (
        <div
          css={{
            borderRadius: radii.small,
            display: 'flex',
            paddingLeft: spacing.medium,
            paddingRight: spacing.medium,
            background: appearanceConfig.backgroundColor,
          }}
        >
          {content}
        </div>
      );
    },
    label: 'Callout',
    chromeless: true,
    props: {
      appearance: fields.select({
        label: 'Appearance',
        options: [
          { value: 'info', label: 'Info' },
          { value: 'error', label: 'Error' },
          { value: 'warning', label: 'Warning' },
          { value: 'success', label: 'Success' },
        ] as const,
        defaultValue: 'info',
      }),
      content: fields.child({
        kind: 'block',
        placeholder: '',
        formatting: 'inherit',
        dividers: 'inherit',
        links: 'inherit',
      }),
    },

    toolbar({ props, onRemove }) {
      return (
        <ToolbarGroup>
          {props.appearance.options.map(opt => {
            const Icon = appearances[opt.value].icon;

            return (
              <Tooltip key={opt.value} content={opt.label} weight="subtle">
                {attrs => (
                  <ToolbarButton
                    isSelected={props.appearance.value === opt.value}
                    onClick={() => {
                      props.appearance.onChange(opt.value);
                    }}
                    {...attrs}
                  >
                    <Icon size="small" />
                  </ToolbarButton>
                )}
              </Tooltip>
            );
          })}

          <ToolbarSeparator />

          <Tooltip content="Remove" weight="subtle">
            {attrs => (
              <ToolbarButton
                variant="destructive"
                onClick={onRemove}
                {...attrs}
              >
                <Trash2Icon size="small" />
              </ToolbarButton>
            )}
          </Tooltip>
        </ToolbarGroup>
      );
    },
  }),
};
