import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StatusBadge } from '.';
import { Tags } from '../../api/models';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StatusBadge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  status: Tags.GOOD,
  label: 'On Track',
};

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Warning.args = {
  status: Tags.BAD,
  label: 'Warning',
};
