import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ReminderPurpose } from '.';
import { EventPurpose } from '../../api/models';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ReminderPurpose',
  component: ReminderPurpose,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ReminderPurpose>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReminderPurpose> = (args) => (
  <ReminderPurpose {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  currentEventPurpose: EventPurpose.CONNECT,
  handleOnSelectEventPurpose: () => {
    console.log('handleOnSelectEventPurpose');
  },
};
