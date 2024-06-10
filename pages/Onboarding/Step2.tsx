import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getMaxPerMonthGlasses, saveMaxPerMonthGlasses } from '../../api';
import { CounterContainer } from '../../components/CounterContainer';
import { OnboardingFooter } from '../../components/OnboardingFooter';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { SUGGESTED_GLASSES_PER_MONTH } from '../../config';
import { FixedPageTemplate } from '../../templates/Onboarding';
import { ThemeColors } from '../../theme';

SplashScreen.preventAutoHideAsync();

export const Step2 = ({
  navigation,
  params,
}: {
  navigation: any;
  params?: any;
}) => {
  const [currentDrinksGoals, setCurrentDrinksGoals] = useState(
    SUGGESTED_GLASSES_PER_MONTH
  );

  const handleOnLoadData = async () => {
    const maxPerMonthGlassesdata = await getMaxPerMonthGlasses();
    if (maxPerMonthGlassesdata) {
      setCurrentDrinksGoals(maxPerMonthGlassesdata);
    } else saveMaxPerMonthGlasses(currentDrinksGoals);
  };

  useEffect(() => {
    handleOnLoadData();
  }, []);

  const handleOnDecreaseCounter = () => {
    setCurrentDrinksGoals((prev) => prev - 1);
    saveMaxPerMonthGlasses(currentDrinksGoals - 1);
  };

  const handleOnIncreaseCounter = () => {
    setCurrentDrinksGoals((prev) => prev + 1);
    saveMaxPerMonthGlasses(currentDrinksGoals + 1);
  };

  const handleSetGlassesManually = (glasses) => {
    setCurrentDrinksGoals(glasses);
    saveMaxPerMonthGlasses(glasses);
  };

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
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 36,
            fontFamily: 'Suez-One',
            padding: 8,
          }}
        >
          How many drinks you plan to have per month?
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 100,
            margin: 8,
            alignItems: 'center',
            backgroundColor: ThemeColors.primary.white,
            borderRadius: 8,
            padding: 16,
            height: 288,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 16,
              fontWeight: '900',
              color: ThemeColors.primary.anotherPurple,
            }}
          >
            Monthly drinks limit
          </Text>
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 14,
              fontWeight: '700',
              color: ThemeColors.primary.textGray,
              textAlign: 'center',
            }}
          >
            Average 6 glasses a week is our general recommendation.
          </Text>
          <CounterContainer
            numberOfGlasses={currentDrinksGoals}
            handleOnDecreaseCounter={handleOnDecreaseCounter}
            setNumberOfGlasses={handleSetGlassesManually}
            handleOnIncreaseCounter={handleOnIncreaseCounter}
            textStyle={{
              color: ThemeColors.primary.anotherPurple,
              width: 88,
              fontSize: 60,
            }}
          />
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 12,
              fontWeight: '700',
              color: ThemeColors.primary.anotherPurple,
            }}
          >
            Avg {Math.round(currentDrinksGoals / 4)} drinks a week
          </Text>
        </View>
        <Text
          style={{
            color: ThemeColors.primary.textGray,
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'Lato',
            padding: 8,
            lineHeight: 16,
          }}
        >
          You can set your own limitation. One shot of spirit or a glass of wine
          or can of beer count as one. The limitation can be edited anytime at
          your dash board. 6 glasses a week is our general recommendation
        </Text>
        <OnboardingFooter navigation={navigation} params={params} />
      </View>
    </FixedPageTemplate>
  );
};
