import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { DrinkQuantityField } from '.';

export default {
  title: 'Components/DrinkQuantityField',
  component: DrinkQuantityField,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DrinkQuantityField>;

const Template: ComponentStory<typeof DrinkQuantityField> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <DrinkQuantityField {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  drinkQuantity: 10,
};
