import React from 'react';
import { ImageBackground, Pressable } from 'react-native';
import { View } from 'react-native';

import { ThemeColors } from '../../theme';

export const ProfileSettingsCard = ({
  children,
  onPress,
}: {
  children: JSX.Element;
  navigation?: any;
  onPress?: any;
}) => {
  return (
    <Pressable
      style={{
        marginVertical: 4,
        width: '100%',
      }}
      {...(onPress && { onPress: onPress })}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: ThemeColors.primary.white,
          borderRadius: 8,
          padding: 0,
          paddingRight: 16,
          height: 68,
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          {children}
        </View>
        <ImageBackground
          style={{
            width: 8,
            height: 12,
          }}
          source={require('../../assets/images/chevronRight.png')}
        />
      </View>
    </Pressable>
  );
};
