import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Text, View } from "react-native";

import { ThemeColors } from "../../theme";
import { Hero } from ".";

export default {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => (
  <View
    style={{
      height: 500,
    }}
  >
    <Hero {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <Text
      style={{
        fontFamily: "Suez-One",
        fontSize: 18,
        padding: 8,
        color: ThemeColors.primary.white,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      You are my Hero!
    </Text>
  ),
};
