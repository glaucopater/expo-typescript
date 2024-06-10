import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { DrinkAlcoholPercentageField } from '.';

export default {
  title: 'Components/DrinkAlcoholPercentageField',
  component: DrinkAlcoholPercentageField,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DrinkAlcoholPercentageField>;

const Template: ComponentStory<typeof DrinkAlcoholPercentageField> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <DrinkAlcoholPercentageField {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  drinkAlcoholPercentage: 0.07,
};
