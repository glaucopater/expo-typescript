import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { DrinkTypeSelector } from '.';

export default {
  title: 'Components/DrinkTypeSelector',
  component: DrinkTypeSelector,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DrinkTypeSelector>;

const Template: ComponentStory<typeof DrinkTypeSelector> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <DrinkTypeSelector {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {};
