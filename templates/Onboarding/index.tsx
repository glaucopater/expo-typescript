import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

SplashScreen.preventAutoHideAsync();

export const FixedPageTemplate = ({
  children,
  viewStyle,
}: {
  children: React.ReactNode;
  viewStyle?: ViewStyle;
}) => {
  const [fontsLoaded] = useFonts({
    'Suez-One': require('../../assets/fonts/SuezOne-Regular.ttf'),
    Lato: require('../../assets/fonts/Lato-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={[styles.root, viewStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
    height: '100%',
    paddingVertical: 16,
  },
});
