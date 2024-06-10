import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { DownloadButton } from '.';

export default {
  title: 'Components/DownloadButton',
  component: DownloadButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DownloadButton>;

const Template: ComponentStory<typeof DownloadButton> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <DownloadButton />
  </View>
);

export const Default = Template.bind({});
Default.args = {};
