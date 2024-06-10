import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NavigationMenu } from '.';

export default {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [],
} as ComponentMeta<typeof NavigationMenu>;

const StoryBookStack = createStackNavigator();

const Template: ComponentStory<typeof NavigationMenu> = (args) => (
  <NavigationContainer independent>
    <StoryBookStack.Navigator>
      <StoryBookStack.Screen
        name="NavigationMenuScreen"
        component={NavigationMenu}
        options={{ header: () => null }}
      />
    </StoryBookStack.Navigator>
  </NavigationContainer>
);

export const Default = Template.bind({});
Default.args = {
  navigation: () => {},
  onClickEvent: () => {},
};
