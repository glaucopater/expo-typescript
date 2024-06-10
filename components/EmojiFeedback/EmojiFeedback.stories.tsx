import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { EmojiFeedback } from '.';

export default {
  title: 'Components/EmojiFeedback',
  component: EmojiFeedback,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof EmojiFeedback>;

const Template: ComponentStory<typeof EmojiFeedback> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <EmojiFeedback {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {};
