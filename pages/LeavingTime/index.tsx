import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, Vibration, View } from 'react-native';

import { completeRunningEvent } from '../../api';
import { RunningBoozyBFEvent } from '../../api/models';
import { GenericButton } from '../../components/GenericButton';
import { cancelScheduledNotification } from '../../components/PushNotificationCreator';
import { ReminderCounter } from '../../components/ReminderCounter';
import { VIBRATION_MEDIUM } from '../../config';
import { FontText, ThemeColors } from '../../theme';
import { calculateMinutesRemaining } from '../../utils';

SplashScreen.preventAutoHideAsync();

export const LeavingTimeButton = (props: any) => {
  return (
    <GenericButton
      viewStyle={{
        width: '100%',
        marginTop: 16,
        backgroundColor: 'transparent',
        height: 56,
        alignSelf: 'center',
        borderColor: 'transparent',
      }}
      textStyle={{
        fontFamily: 'Lato',
        fontSize: 14,
        fontWeight: '700',
        color: ThemeColors.primary.white,
      }}
      {...props}
    />
  );
};

export const LeavingTime = ({ navigation, route }) => {
  const currentEvent: RunningBoozyBFEvent = route?.params?.event || null;
  const minutesRemaining = currentEvent
    ? calculateMinutesRemaining(new Date(currentEvent.estimatedLeavingTime))
    : 0;

  const proposedleavingTime = currentEvent.reminderLeavingTime;
  const [currentEventReminderLeavingTime, setCurrentEventReminderLeavingTime] =
    useState(proposedleavingTime);

  useEffect(() => {
    if (minutesRemaining <= 0) {
      completeCurrentEvent();
    }
  }, [minutesRemaining]);

  const handleLeavingNow = async () => {
    completeCurrentEvent();
  };

  const completeCurrentEvent = async () => {
    completeRunningEvent();
    if (Platform.OS !== 'web') {
      await cancelScheduledNotification();
      Vibration.vibrate(VIBRATION_MEDIUM);
    }
    navigation.navigate('Home');
  };

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
    <View onLayout={onLayoutRootView} style={styles.root}>
      <Text />
      <ReminderCounter
        isReadonly
        timer={currentEventReminderLeavingTime}
        setReminderLeavingTime={setCurrentEventReminderLeavingTime}
      />
      <Text
        style={[
          FontText.title1,
          {
            color: ThemeColors.primary.white,
            textAlign: 'center',
            fontSize: 29,
            fontWeight: '400',
            lineHeight: 38,
          },
        ]}
      >
        {currentEvent && minutesRemaining + ' minutes left to leaving time'}
      </Text>
      <Text
        style={[
          FontText.title1,
          {
            fontFamily: 'Lato',
            color: ThemeColors.primary.white,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 20,
          },
        ]}
      >
        The event will be saved in the drinks record, you can add how you feel
        later
      </Text>

      <View
        style={{
          width: '100%',
        }}
      >
        <LeavingTimeButton
          onClickEvent={handleLeavingNow}
          label="Leaving now"
        />
        <LeavingTimeButton
          onClickEvent={() => {
            navigation.navigate('Home');
          }}
          label="Set new leaving time (boo!)"
          textStyle={{
            color: ThemeColors.primary.octopus,
            fontSize: 14,
            fontWeight: '700',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ThemeColors.primary.darkPurple,
    maxWidth: 400,
    width: '100%',
    display: 'flex',
    padding: 48,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    height: '100%',
    justifyContent: 'space-between',
  },
  text: {
    color: ThemeColors.primary.white,
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  mediumText: {
    fontSize: 18,
    color: ThemeColors.primary.darkPurple,
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
  isEditable: {
    borderWidth: 1,
    borderColor: ThemeColors.primary.white,
    width: 200,
  },
});
