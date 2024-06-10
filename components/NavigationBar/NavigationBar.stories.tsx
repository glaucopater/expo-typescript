import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Text, View } from 'react-native';

import NavigationBar from '.';

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [],
} as ComponentMeta<typeof NavigationBar>;

const StoryBookStack = createStackNavigator();

const MockContainer = () => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'space-around',
      width: 400,
      height: 300,
    }}
  >
    <NavigationBar {...Default.args} />
  </View>
);

const Template: ComponentStory<typeof NavigationBar> = (args) => (
  <NavigationContainer independent>
    <StoryBookStack.Navigator>
      <StoryBookStack.Screen
        name="NavigationBarScreen"
        component={MockContainer}
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
