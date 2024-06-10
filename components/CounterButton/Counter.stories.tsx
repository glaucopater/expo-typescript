import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CounterButton } from '.';

export default {
  title: 'Components/CounterButton',
  component: CounterButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CounterButton>;

const Template: ComponentStory<typeof CounterButton> = (args) => (
  <CounterButton {...args} />
);

export const Increase = Template.bind({});
Increase.args = {
  label: '+',
};

export const Decrease = Template.bind({});
Decrease.args = {
  label: '-',
};
