import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingFooter } from '../../components/OnboardingFooter';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { FixedPageTemplate } from '../../templates/Onboarding';
import { ThemeColors } from '../../theme';

SplashScreen.preventAutoHideAsync();

export const Step3 = ({
  navigation,
  params,
}: {
  navigation: any;
  params?: any;
}) => {
  return (
    <FixedPageTemplate>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 100,
          margin: 16,
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {<OnboardingHeader navigation={navigation} />}
        <Text
          style={{
            color: ThemeColors.primary.darkPurple,
            fontSize: 36,
            fontWeight: '700',
            lineHeight: 36,
            fontFamily: 'Suez-One',
          }}
        >
          Ready to make peace with alcohol?
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 100,
            margin: 8,
          }}
        >
          <Text
            style={{
              color: ThemeColors.primary.darkPurple,
              fontSize: 14,
              fontWeight: '700',
              fontFamily: 'Lato',
            }}
          >
            Being self-aware is the sexiest!. Congrats on your first step to
            build a better drinking habit!
          </Text>
        </View>

        <OnboardingFooter navigation={navigation} params={params} />
      </View>
    </FixedPageTemplate>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
  },
  text: {
    color: 'white',
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  mediumText: {
    fontSize: 18,
    fontFamily: 'Suez-One',
    color: ThemeColors.primary.white,
  },
  smallText: {
    fontSize: 16,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
