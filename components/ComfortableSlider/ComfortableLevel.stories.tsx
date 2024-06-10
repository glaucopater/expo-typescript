import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { ComfortableSlider } from '.';
import { EventComfortableLevel } from '../../api/models';

export default {
  title: 'Components/ComfortableSlider',
  component: ComfortableSlider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ComfortableSlider>;

const Template: ComponentStory<typeof ComfortableSlider> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <ComfortableSlider {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  comfortableLevel: EventComfortableLevel.NATURAL,
};
