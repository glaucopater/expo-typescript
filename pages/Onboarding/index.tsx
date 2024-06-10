import * as SplashScreen from 'expo-splash-screen';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getCurrentGoal, getIsOnboarded, saveGoals } from '../../api';
import { UserGoals } from '../../api/models';
import { GenericButton } from '../../components/GenericButton';
import { OnboardingFooter } from '../../components/OnboardingFooter';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { FixedPageTemplate } from '../../templates/Onboarding';
import { ThemeColors } from '../../theme';

SplashScreen.preventAutoHideAsync();

export const Onboarding = ({
  navigation,
  params,
}: {
  navigation: any;
  params?: any;
}) => {
  const [currentGoal, setCurrentGoal] = useState<UserGoals | null>();
  const [currentParams, setCurrentParams] = useState(params);

  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  const handleOnLoadData = async () => {
    const isOnboarded = await getIsOnboarded();
    if (isOnboarded && prevRoute !== 'Profile') {
      navigation.navigate('Home');
    } else {
      const storedGoal = await getCurrentGoal();
      setCurrentGoal(storedGoal);
    }
  };

  useEffect(() => {
    handleOnLoadData();
  }, []);

  const handleOnSelectGoal = (_e: SyntheticEvent, goal: UserGoals) => {
    if (goal) {
      setCurrentGoal(goal);
      setCurrentParams({ goal });
      saveGoals(goal);
    }
  };

  return (
    <FixedPageTemplate>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 100,
          margin: 16,
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
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
            width: '100%',
            padding: 8,
          }}
        >
          What goal do you have in mind?
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 100,
            margin: 8,
            width: '100%',
          }}
        >
          {Object.keys(UserGoals).map((goal, index) => (
            <GenericButton
              onClickEvent={(e) => handleOnSelectGoal(e, goal as UserGoals)}
              viewStyle={{
                width: '100%',
                height: 88,
                backgroundColor:
                  currentGoal === goal
                    ? ThemeColors.primary.octopus
                    : ThemeColors.primary.white,
                marginVertical: 4,
                borderWidth: 2,
                borderColor: ThemeColors.primary.octopus,
              }}
              textStyle={{
                color:
                  currentGoal === goal
                    ? ThemeColors.primary.white
                    : ThemeColors.primary.octopus,
                fontSize: 16,
                fontWeight: '900',
                fontFamily: 'Lato',
              }}
              key={index}
              label={UserGoals[goal]}
              testID="onboarding-next"
            />
          ))}
        </View>
        <OnboardingFooter navigation={navigation} params={currentParams} />
      </View>
    </FixedPageTemplate>
  );
};
