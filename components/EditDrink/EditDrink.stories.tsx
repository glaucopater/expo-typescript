import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { EditDrink } from '.';
import { Drink } from '../../api/models';
import { generateRandomDrinks } from '../../utils';

export default {
  title: 'Components/EditDrink',
  component: EditDrink,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof EditDrink>;

const mockDrink: Drink = generateRandomDrinks(1)[0];

const Template: ComponentStory<typeof EditDrink> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <EditDrink {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = { ...mockDrink };
