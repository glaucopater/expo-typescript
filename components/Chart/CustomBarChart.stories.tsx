import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CustomLineChart, barData, mockData } from './CustomBarChart';
import { getChartData } from '../../utils';
import { BoozyBFEvent, HangoverFeedback, MoodFeedback } from '../../api/models';

export default {
  title: 'Components/CustomLineChart',
  component: CustomLineChart,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CustomLineChart>;

const Template: ComponentStory<typeof CustomLineChart> = (args) => (
  <View
    style={{
      padding: 8,
    }}
  >
    <CustomLineChart {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  data: mockData,
};

const mockEvent = {
  id: '123',
  name: 'Event name',
  reminderLeavingTime: [10, 30],
  numberOfGlasses: 10,
  isCompleteEvent: false,
  date: new Date().getTime(),
  lastUpdate: new Date().getTime(),
};


const mockBoozyBFEvent: BoozyBFEvent = {
  ...mockEvent,
  name: 'Boozy BF',
  moodStatus: MoodFeedback.HAPPY,
  hangoverFeedback: HangoverFeedback.FRESH,
  amount: 10,
  currency: ''
}

const customBarData = getChartData(Array.from({ length: 7 }).map((_item, index) =>({
  ...mockBoozyBFEvent,
  date: new Date().getTime() - 1000 * 60 * 60 * 24 * (8 - index),
  numberOfGlasses: Math.floor(Math.random() * 10)
})));

export const Custom = Template.bind({});
Custom.args = {
  data: customBarData
};