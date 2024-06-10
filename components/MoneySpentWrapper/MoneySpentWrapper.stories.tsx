import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { MoneySpentWrapper } from '.';

export default {
  title: 'Components/MoneySpentWrapper',
  component: MoneySpentWrapper,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MoneySpentWrapper>;

const Template: ComponentStory<typeof MoneySpentWrapper> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <MoneySpentWrapper {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  eventAmount: 100,
  setEventAmount: () => console.log('new amount'),
};
