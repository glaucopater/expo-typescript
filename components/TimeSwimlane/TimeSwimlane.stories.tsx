import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';

import { TimeSwimlane } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TimeSwimlane',
  component: TimeSwimlane,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TimeSwimlane>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TimeSwimlane> = (args) => {
  return (
    <View>
      <TimeSwimlane year={args.year} month={args.month} />
    </View>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  year: 2023,
  month: 1,
};
