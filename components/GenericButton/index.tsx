import React from 'react';
import { Pressable, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { textStyle } from 'styled-system';

import { ThemeColors } from '../../theme';

export const GenericButton = ({
  label,
  onClickEvent,
  isDisabled,
  isSelected,
  viewStyle,
  textStyle,
  testID,
}: {
  label: string;
  onClickEvent?: any;
  isDisabled?: boolean;
  isSelected?: boolean;
  viewStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  testID?: string;
}) => {
  return (
    <Pressable
      testID={testID || 'generic-button'}
      onPress={onClickEvent}
      disabled={isDisabled}
      style={[
        styles.container,
        isSelected && {
          backgroundColor: ThemeColors.primary.darkPurple,
        },
        viewStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          isSelected && {
            color: ThemeColors.primary.white,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 14,
    width: 160,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: ThemeColors.primary.darkPurple,
    cursor: 'pointer',
  },
  text: {
    color: ThemeColors.primary.white,
    fontFamily: 'Lato',
    fontSize: 12,
  },
});
