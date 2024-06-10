import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { EventCard } from '.';
import { BoozyBFEvent, HangoverFeedback, MoodFeedback } from '../../api/models';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/EventCard',
  component: EventCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EventCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EventCard> = (args) => (
  <EventCard {...args} />
);

const mockEvent: BoozyBFEvent = {
  id: '4d161f58-a15b-4a17-84e4-2b46c2da7a43',
  name: 'Event vqqd7nlbrmh',
  date: new Date('18/01/2023').getTime(),
  moodStatus: MoodFeedback.HAPPY,
  hangoverFeedback: HangoverFeedback.FRESH,
  amount: 10.4,
  currency: '€',
  numberOfGlasses: 15,
  notes: 'something 2',
  lastUpdate: new Date('24/01/2023').getTime(),
  version: 7,
};

export const HappyEvent = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HappyEvent.args = {
  event: mockEvent,
};

export const AggressiveEvent = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AggressiveEvent.args = {
  event: {
    ...mockEvent,
    moodStatus: MoodFeedback.AGGRESSIVE,
    hangoverFeedback: HangoverFeedback.BAD,
  },
};

export const NervousEvent = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NervousEvent.args = {
  event: {
    ...mockEvent,
    moodStatus: MoodFeedback.NERVOUS,
    hangoverFeedback: HangoverFeedback.MILD,
  },
};
