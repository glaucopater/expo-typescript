import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.info(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export const ScrollViewWrapperTemplate = ({
  children,
  navigationBar,
  rootStyle,
  scrollViewStyle,
  testID,
  forceAppReadyness,
}: {
  children: React.ReactElement | React.ReactElement[];
  navigationBar?: React.ReactElement;
  rootStyle?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  testID: string;
  forceAppReadyness: boolean;
}) => {
  const [appIsReady, setAppIsReady] = useState(forceAppReadyness);

  const [fontsLoaded] = useFonts({
    'Suez-One': require('../../assets/fonts/SuezOne-Regular.ttf'),
    Lato: require('../../assets/fonts/Lato-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    async function prepare() {
      if (!appIsReady) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (e) {
          console.warn(e);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
        }
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <View style={[styles.root, rootStyle]} testID={testID}>
      <ScrollView
        onLayout={onLayoutRootView}
        style={[styles.root, scrollViewStyle]}
      >
        {children}
      </ScrollView>
      {navigationBar}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
    height: '100%',
  },
});
