import React from 'react';
import { ImageBackground } from 'react-native';

export const Breaker = ({ isActive }: { isActive: boolean }) => {
  const imageSource = isActive
    ? require('../../assets/images/breakerActive.png')
    : require('../../assets/images/breaker.png');

  return (
    <ImageBackground
      style={{
        width: '100%',
        height: 1,
        marginVertical: 8,
      }}
      source={imageSource}
    />
  );
};
