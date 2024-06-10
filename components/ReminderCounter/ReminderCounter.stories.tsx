import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ReminderCounter } from '.';
import { ReminderFrequency } from '../../api/models';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/GenericReminderCounter',
  component: ReminderCounter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReminderCounter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReminderCounter> = (args) => (
  <ReminderCounter {...args} />
);

export const Start = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Start.args = {
  isStart: true,
  title: 'Start Remind my level at',
  reminderSelection: ReminderFrequency.EVERY_120_MINUTES,
  setReminderSelection: (frequency: ReminderFrequency) => {
    console.info(frequency);
  },
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: false,
  title: 'Leaving time',
};
