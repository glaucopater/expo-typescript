import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Text, View } from 'react-native';

import { ProfileSettingsCard } from '.';
import { ThemeColors } from '../../theme';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ProfileSettingsCard',
  component: ProfileSettingsCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ProfileSettingsCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileSettingsCard> = (args) => (
  <ProfileSettingsCard {...args} />
);

const mockContent = (
  <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
  >
    <Text
      style={{
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        color: ThemeColors.primary.textGray,
      }}
    >
      Send Feedback
    </Text>
    <Text
      style={{
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 16,
        lineHeight: 26,
        color: ThemeColors.primary.darkPurple,
      }}
    >
      Boozybf@gmail.com
    </Text>
  </View>
);

export const Default = Template.bind({});
Default.args = {
  children: mockContent,
};
