import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { padding } from 'styled-system';

import { ProgressBar } from '.';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [],
} as ComponentMeta<typeof ProgressBar>;

const MediumProgress: ComponentStory<typeof ProgressBar> = (args) => (
  <View
    style={{
      display: 'flex',
      paddingVertical: 100,
    }}
  >
    <ProgressBar {...args}></ProgressBar>
  </View>
);

export const Medium = MediumProgress.bind({});
Medium.args = {
  glassesTotalAmount: 10,
  currentGlassesCounter: 5,
};

export const Maximum = MediumProgress.bind({});
Maximum.args = {
  glassesTotalAmount: 10,
  currentGlassesCounter: 10,
};

export const Minimum = MediumProgress.bind({});
Minimum.args = {
  glassesTotalAmount: 10,
  currentGlassesCounter: 1,
};
